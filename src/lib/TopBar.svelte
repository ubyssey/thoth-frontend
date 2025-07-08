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

<style>
    nav {
        padding: 1em;
        border-bottom: 1px solid #666;
    }
</style>