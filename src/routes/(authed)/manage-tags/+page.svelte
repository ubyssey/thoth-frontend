<script>
    import { enhance } from "$app/forms";
    
    import { getTimeSince } from "$lib/timeMethods";
    import DomainListItem from "$lib/DomainListItem.svelte";
    import TagList from "./TagList.svelte";
    import AddCreateForm from "./AddCreateForm.svelte";
    let {data} = $props();

    async function searchDomains(query) {
            
        console.log("hello?");
        const url = "http://localhost:8000/api/domains/?is_tagged=false&ordering=-time_discovered&was_requested=true&search=" + query + "&format=json";
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

    let roots = $derived(data.tags.filter((t) => t.parents.length === 0).map((t) => t.id));

    let selectedTag = $state(null);
    let domainQuery = $state("ubc.ca");
    let suggestedDomainsPromise = $derived(searchDomains(domainQuery));
    let selected = $derived(selectedTag === null ? null: data.tags.filter((t) => t.id == selectedTag)[0]);

    async function updateSelectedTag(tag) {
        selectedTag = tag.id;
    }

</script>

<div class="c-main">
    <div class="left">
        <div class="c-tags-list">
            <h1>Tags</h1>
            <TagList list={roots} tag_name={null} tags={data.tags} updateSelectedTag={updateSelectedTag}/>

            <datalist id="flavours" class="add-input">
                {#each data.tags as tag}
                <option value="{tag.name}"></option>
                {/each}
            </datalist>
        </div>
    </div>
    {#if selected != null}
    <div class="right">
        <div class="c-tag-domain-list">
            <h1>{selected.name}</h1>

            <ul>
                <li>
                    <form method="POST" action="?/add_domain_to_tag" use:enhance>
                        <input name="url" type="text">
                        <input name="tag" type="hidden" value="{selected.name}">
                        <input class="o-input-submit" type="submit" value="Submit">
                    </form>
                </li>

                {#each selected.direct_domains as domain}
                <li>
                    {domain.url}
                    <form class="o-form-delete-button" method="POST" action="?/remove_domain_from_tag" use:enhance>
                        <input name="url" type="hidden" value="{domain.url}">
                        <input name="tag" type="hidden" value="{selected.name}">
                        <input class="delete" type="submit" value="❌">
                    </form>
                </li>
                {/each}

            </ul>
        </div>

        <div class="c-domain-search">
            <input on type="search" name="search" bind:value="{domainQuery}">

            <ul>
            {#await suggestedDomainsPromise then suggestedDomains}
            {#each suggestedDomains as domain}
                <li class="o-domain-option-list-item">
                    <form class="o-add-form" method="POST" action="?/add_domain_to_tag" use:enhance>
                        <input name="url" type="hidden" value="{domain.url}">
                        <input name="tag" type="hidden" value="{selected.name}">
                        <input class="o-add-button" type="submit" value="+">
                    </form>
                    {#if domain.image != "" && domain.image != null}
                        <img class="o-domain-img o-domain-list-item--image" src="{domain.image}" alt="{domain.title}">
                    {/if}
                    <div class="o-webpage-list-item">
                        <div class="o-webpage-list-item--url">
                            <a href="{domain.url}" title={domain.url}>{domain.url}</a>
                        </div>
                        <div class="o-webpage-list-item--head">
                            <a href="/domain/{domain.id}/" class="title" title={domain.title}>{domain.title}</a>&#8197; <time datetime={domain.time_discovered}>({getTimeSince(domain.time_discovered)})</time>
                        </div>
                    </div>
                </li>
            {/each}
            {/await}
            </ul>
        </div>
    </div>
    {/if}
</div>

<style lang="scss">
    .c-main {
        padding: 0;
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
    .c-tag-domain-list {
        margin-block: 2em;
        padding-inline: 2em;
        border-left: 2px solid var(--grey-0);
        ul {
            padding: 0;
            list-style: none;
            li {
                margin-block: 1em;
            }
        }
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
            padding: 0 1em 0 0;
            list-style: none;
            overflow-x: clip;
            overflow-y: auto;
        }
    }
    
    .o-domain-list-item--image {
        margin: auto 0.75em 1.5em auto;
        width: 3em;
        flex-shrink: 0;
    }
</style>