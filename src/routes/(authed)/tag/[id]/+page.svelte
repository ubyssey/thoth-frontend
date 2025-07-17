<script>
    import TopBar from "$lib/TopBar.svelte";
    import Header from "$lib/Header.svelte";
    import WebpageWall from "$lib/WebpageWall.svelte";
    import DomainCard from "$lib/DomainCard.svelte";
    import TagCard from "$lib/TagCard.svelte";
    import TagBar from "$lib/TagBar.svelte";
    let {data} = $props();

    let info = $derived({
        "title": data.tag.name,
        "description": data.tag.direct_domains.map((domain) => domain.title).concat(data.tag.children.map((tag) => tag.name)).join(", ")
    });

    function titleSize(title) {
        if (title.length > 45) {
            return "small";
        } else {
            return "large";
        }
    }
</script>


<div class="c-main">
    <TopBar defaultSearchQuery={data.tag.name} />
    <Header info={info} />
    {#if data.tag.children.length == 0}
        <WebpageWall webpagesByMonth={data.webpagesByMonth} />
    {:else}
        <div class="c-domain-wall">
        {#each data.tag.direct_domains as domain}
            <DomainCard domain={domain} />
        {/each}
        {#each data.tag.children as child}
            {#if child.children.length == 0}
                <TagCard tag={child} />
            {:else}
                <TagBar tag={child} />
            {/if}
        {/each}
        </div>
    {/if}
    </div>
<!-- <DomainWall title={data.tag.name} domainsByMonth={data.domainsByMonth} /> -->