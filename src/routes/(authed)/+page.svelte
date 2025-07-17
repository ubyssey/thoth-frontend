<script>
    import TopBar from "$lib/TopBar.svelte";
    import DomainCard from "$lib/DomainCard.svelte";
    let {data} = $props();
</script>

<TopBar defaultSearchQuery={""} />
<div class="c-main">
    <div class="c-domain-wall">
        {#each data.domains as domain}
            <DomainCard domain={domain} />
        {/each}
    </div>
</div>