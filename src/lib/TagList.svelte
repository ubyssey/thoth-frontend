<script>
    import TagNestedListing from "./TagNestedListing.svelte";
	let { tags } = $props();
</script>

{#each tags as tag}
<li class="o-tag-list">
    <div><button onclick={(e) => e.target.parentElement.parentElement.classList.toggle("show-list")}>></button>
        <a class="o-tag-name" href="/tag/{tag.id}">{tag.name}</a></div>
    <ul>
        <TagNestedListing tag={tag} />
    </ul>
</li>
{/each}