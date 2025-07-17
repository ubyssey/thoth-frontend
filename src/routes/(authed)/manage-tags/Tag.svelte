<script>
    import TagList from "./TagList.svelte";
    let {tag} = $props();
</script>

<li>
    <a href="/manage-tags/{tag.id}">{tag.name} {tag.direct_domains.length > 0 ? "(" + String(tag.direct_domains.length) + ")" : ""}</a>
    {#if tag.direct_domains.length == 0 || tag.children.length > 0}
    <TagList list={tag.children} tag_name={tag.id} />
    {/if}
</li>

<style lang="scss">
    li {
        position: relative;
        &::before {
            margin: 0.25em;

            display: inline-block;
            width: 1em;
            height: 0.5em;

            border-radius: 0 0 0 0.25em;
            border-left: 2px solid var(--grey-0);
            border-bottom: 2px solid var(--grey-0);

            content: "";
        }
        a {
            padding:  0.5em 0.25em;
            display: inline-block;
            text-decoration: none;

            &:hover {
                background-color: #eee;
                color: black;
            }
        }
    }
</style>