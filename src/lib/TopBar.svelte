<script>
    let {defaultSearchQuery} = $props();
    let searchQuery = $state(defaultSearchQuery);

</script>

<nav>
    <div class="c-search">
        <input on type="search" name="search" bind:value="{searchQuery}">
        <a href="/search/{searchQuery}">Search</a>
    </div>
</nav>

<style lang="scss">
    nav {
        padding: 1em;
        border-bottom: 1px solid var(--grey-1);

        .c-search input {
            background: transparent;
            border: 1px solid var(--grey-1);
            color: var(--text-color);
            padding: 0.5em;
            border-radius: 0.5em;
            font-size: 1em;
        } 
    }
</style>