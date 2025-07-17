<script>
    import DomainListItem from "$lib/DomainListItem.svelte";
    import TagList from "./TagList.svelte";
	let { tag } = $props();
</script>

{#each tag.direct_domains as domain}
    <DomainListItem domain={domain}/>
{/each}

<TagList tags={tag.children} />