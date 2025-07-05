<script>
    import DomainListItem from "$lib/DomainListItem.svelte";
    let {data, children} = $props();
</script>

<div class="c-container">
    <aside class="c-domain-sidebar">
        <div class="c-header">
            <h1><a href="/">Thoth</a></h1>
            <p>Perhaps the beginning, but never the end!</p>
        </div>

        <ul>
        {#each data.domains as domain}
            <DomainListItem domain={domain}/>
        {/each}
        </ul>
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

        width: 400px;
        max-height: 100vh;
        padding: 1em;

        background: black;
        ul {
            padding: 0 1em;
            list-style: none;
            overflow: auto;
            max-height: 75%;
            box-sizing: border-box;
            margin-block: 1em;
        }
    }
    .c-container {
        display: flex;
    }
    .c-header {
        text-align: center;
        h1 a{
            color: white;
            text-decoration: none;
        }
    }
    main {
        width: 100%;
    }
</style>