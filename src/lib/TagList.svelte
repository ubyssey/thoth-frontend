<script>
    import TagNestedListing from "./TagNestedListing.svelte";
	let { tags } = $props();
</script>

{#each tags as tag}
<li>
    <div>{tag.name}</div>
    <TagNestedListing tag={tag} />
</li>
{/each}
