<script>
    import { enhance } from "$app/forms";
    
    import DomainListItem from "$lib/DomainListItem.svelte";
    import TagList from "./TagList.svelte";
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

    let domainQuery = $state("");
    let suggestedDomainsPromise = $derived(searchDomains(domainQuery));

</script>

<div class="c-main">
    <div class="left">
        <div class="c-tags-list">
            <TagList list={data.tags} tag_name={null}/>

            <datalist id="flavours" class="add-input">
                {#each data.tags as tag}
                <option value="{tag.name}"></option>
                {/each}
            </datalist>
        </div>
    </div>
    <div class="right">
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
</div>

<style lang="scss">
    .c-main {
        display: flex;
        .left {
            flex-grow: 1;
        }
        .right {
            flex-shrink: 0;
        }
    }
    .c-tags-list {
        width: fit-content;
        overflow: auto;
    }
    .c-domain-search {
        height: 60vh;
        width: 300px;
        overflow: auto;
        ul {
            padding: 0;
            list-style: none;
            li {
                padding: 0.5em;
            }
        }
    }
</style>