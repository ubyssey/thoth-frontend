<script>
    import { enhance } from "$app/forms";
    
    import DomainListItem from "$lib/DomainListItem.svelte";
    import TagList from "./TagList.svelte";
    import AddCreateForm from "./AddCreateForm.svelte";
    let {data} = $props();

    async function searchDomains(query) {
            
        console.log("hello?");
        const url = "http://localhost:8000/api/domains/?is_tagged=false&ordering=-time_discovered&search=" + query + "&format=json";
        try {
            console.log("truing to fetch?");
            const response = await fetch(url, {method: 'GET', mode: 'cors'});
            //console.log(response);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            return json.results;
        } catch (error) {
            console.log("failed oops");
            console.error(error.message);
            console.log(error);
            return [];
        }
    }

    let selectedTag = $state(null);
    let domainQuery = $state("ubc.ca");
    let suggestedDomainsPromise = $derived(searchDomains(domainQuery));

    async function updateSelectedTag(tag) {
        selectedTag = tag;
    }

</script>

<div class="c-main">
    <div class="left">
        <div class="c-tags-list">
            <TagList list={data.tags} tag_name={null} updateSelectedTag={updateSelectedTag}/>

            <datalist id="flavours" class="add-input">
                {#each data.tags as tag}
                <option value="{tag.name}"></option>
                {/each}
            </datalist>
        </div>
    </div>
    {#if selectedTag != null}
    <div class="right">
        <div>
            <h1>{selectedTag.name}</h1>

            <ul>
                {#each selectedTag.direct_domains as domain}
                <li>{domain.url}</li>
                {/each}

                <li>
                    <AddCreateForm />
                    <form class="o-hidden-add-form" method="POST" action="?/add_domain" use:enhance>
                        <input name="url" type="text">
                        <input name="tag" type="hidden" value="{selectedTag.name}">
                        <input type="submit">
                    </form>
                </li>

            </ul>
        </div>

        <div class="c-domain-search">
            <input on type="search" name="search" bind:value="{domainQuery}">

            <ul>
            {#await suggestedDomainsPromise then suggestedDomains}
            {#each suggestedDomains as domain}
                <DomainListItem domain={domain} /> 
            {/each}
            {/await}
            </ul>
        </div>
    </div>
    {/if}
</div>

<style lang="scss">
    .c-main {
        display: flex;
        flex-grow: 1;
        .left {
            padding: 2em;
            width: fit-content;
            flex-shrink: 0;
        }
        .right {
            display: flex;
            flex-grow: 1;
        }
    }
    .c-tags-list {
        width: fit-content;
        overflow: auto;
    }
    .c-domain-search {
        margin-left: auto;
        padding: 2em;
        width: 400px;
        max-height: 100vh;
        box-sizing: border-box;
        overflow: auto;
        flex-direction: column;
        display: flex;
        ul {
            overflow: auto;
            padding: 0 1em 0 0;
            list-style: none;
            li {
                padding: 0.5em;
            }
        }
    }
</style>