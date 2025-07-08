<script>
    import DomainListItem from "$lib/DomainListItem.svelte";
    import TagNestedListing from "$lib/TagNestedListing.svelte";
    let {data, children} = $props();

    let tagNumber = $state(0);

    let tag = $derived(data.tags[tagNumber]);

</script>

<div class="c-container">
    <aside class="c-domain-sidebar">
        <div class="c-header">
            <h1><a href="/">Thoth</a></h1>
            <p>Perhaps the beginning, but never the end!</p>
        </div>

        <select bind:value={tagNumber}>
            {#each data.tags as tagg, index}
                <option value="{index}">{tagg.name}</option>
            {/each}
        </select>

        <TagNestedListing tag={tag}/>
    </aside>

    <main>
        {@render children()}
    </main>
</div>


<style lang="scss">
    .c-domain-sidebar {
        position: sticky;
        left: 0;
        top: 0;
        bottom: 0;

        display: flex;
        flex-direction: column;
        flex-shrink: 0;

        width: 400px;
        max-width: 20%;
        max-height: 100vh;
        padding: 1em;

        background: black;
    }
    .c-container {
        display: flex;
        min-height: 100%;
    }
    .c-header {
        padding-inline: 1em;
        text-align: center;
        h1 a{
            color: white;
            text-decoration: none;
        }
    }
    select {
        border: 1px solid #4d4a4a;
        border-radius: 0.25em;
        background: black;
        
        color: white;
        font-size: 1em;
    }
    main {
        width: -moz-available;
    }
</style>