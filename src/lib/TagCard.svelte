<script>
    import DomainCard from "./DomainCard.svelte";
    import WebpageListItem from "$lib/WebpageListItem.svelte";
	let { tag } = $props();

    let displayedWebpages = $derived(tag.webpages.slice(0, 5));

</script>

{#if tag.children.length == 0}
<div class="o-card">
    <h3><a href="/tag/{tag.id}/" title="{tag.name}">{tag.name}</a></h3>
    
    <ul>
        {#each displayedWebpages as webpage}
            <WebpageListItem webpage={webpage} domainUrl={null}/>
        {/each}
    </ul>
</div>
{:else}
<div class="o-card">
    <h3><a href="/tag/{tag.id}/" title="{tag.name}">{tag.name}</a></h3>
    
    <ul>
        {#each tag.direct_domains as domain}
            <DomainCard domain={domain}/>
        {/each}
        {#each tag.children as child}
            <TagCard tag={child} />
        {/each}
    </ul>
</div>
{/if}