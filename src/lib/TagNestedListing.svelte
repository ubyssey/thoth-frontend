<script>
    import DomainListItem from "$lib/DomainListItem.svelte";
    import TagList from "./TagList.svelte";
	let { tag } = $props();
</script>

<ul>
{#each tag.domains as domain}
    <DomainListItem domain={domain}/>
{/each}

<TagList tags={tag.children} />
</ul>

<style>
    ul {
        margin-block: 1em;
        padding: 0 1em;
        list-style: none;
        overflow: auto;
        max-height: 75%;
        box-sizing: border-box;
        border-left: #4d4a4a solid 1px;
    }
</style>