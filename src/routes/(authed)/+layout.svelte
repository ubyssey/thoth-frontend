<script>
    import DomainListItem from "$lib/DomainListItem.svelte";
    import TagNestedListing from "$lib/TagNestedListing.svelte";
    let {data, children} = $props();

    let tagNumber = $state(0);
    console.log("data");
    console.log(data);

    let tag = $derived(data.tags.length > 0 ? data.tags[tagNumber] : null);

</script>

<div class="c-container">
    <nav class="c-sidebar-nav">
        <ul>
            <li><a href="/">Thoth</a></li>
            <li>Notes</li>
        </ul>
        <aside class="c-domain-sidebar">

            <div class="c-top-level-tags">
                <a href="/manage-tags">edit</a>

            {#each data.tags as top_level, index}
                {#if index != tagNumber}
                <button onclick={tagNumber = index}>{top_level.name}</button>
                {/if}
            {/each}
            <!--
            <form action="http://localhost:8000/api/tags/" method="POST" enctype="multipart/form-data" class="form-horizontal" novalidate="">
                <input name="name" class="form-control" type="text">
                <input name="slug" class="form-control" type="text">
                <input type="hidden" name="is_top_level" value="true">
                <input type="submit">
            </form>
            -->
            </div>

            {#if tag}
            <h2><a href="/tag/{tag.id}">{tag.name}</a></h2>

            <ul>
            <TagNestedListing tag={tag}/>
            </ul>
            {/if}
        </aside>

        <div class="c-sidebar-nav--user">
            <span>{data.user.initials}</span>
        </div>
    </nav>

    <main>
        {@render children()}
    </main>
</div>


<style lang="scss">
    .c-domain-sidebar {
        display: none;
        position: absolute;
        left: 100%;
        top: 0;
        bottom: 0;

        flex-direction: column;
        flex-shrink: 0;

        width: 400px;
        max-width: 20vw;
        max-height: 100vh;
        padding: 1em;

        background: var(--background);
        border-right: 2px solid var(--grey-0);

        h2 {
            margin-bottom: 0.5em;
            font-size: 1em;
        }

        &:hover {
            display: flex;
        }
    }
    .c-sidebar-nav {
        position: sticky;
        top: 0;
        z-index: 100;

        display: flex;
        flex-direction: column;
        height: 100vh;

        &:hover {
            .c-domain-sidebar {
                display: flex;
            }
        }

        > ul {
            padding: 1em;
            list-style: none;
            li {
                margin-block: 1em;
            }
        }

        .c-sidebar-nav--user {
            margin: auto auto 0 auto;
            padding: 1.5em 0.5em;
            text-align: center;
        }
    }
    .c-top-level-tags {
        margin-block: 0.5em;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.25em;
        button {
            padding: 0.5em 1em;
            max-width: 7.5em;
            border-radius: 0.5em;
            border: none;
            
            overflow: clip;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.75em;

            background: var(--background-darker);
            color: var(--text-color);

            cursor: pointer;
        }
    }
    .c-container {
        display: flex;
        min-height: 100%;
    }
    .c-header {
        padding-inline: 1em;
        text-align: center;
        h1 a{
            color: var(--text-color);
            text-decoration: none;
        }
    }
    main {
        width: -moz-available;
    }
</style>