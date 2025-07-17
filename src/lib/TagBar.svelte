<script>
    import DomainCard from "./DomainCard.svelte";
    import TagCard from "./TagCard.svelte";
	let { tag } = $props();

    let displayedWebpages = $derived(tag.webpages.slice(0, 5));

</script>

<div class="o-month">
    <h3><a href="/tag/{tag.id}/" title="{tag.name}">{tag.name}</a></h3>
    <div class="c-domain-wall">
        {#each tag.direct_domains as domain}
            <DomainCard domain={domain}/>
        {/each}
        {#each tag.children as child}
            <TagCard tag={child} />
        {/each}
    </div>
</div>
