<script>
    import TagList from "./TagList.svelte";
    import { enhance } from "$app/forms";
    let {tag, updateSelectedTag} = $props();
</script>

<li>
    <button onclick={() => updateSelectedTag(tag)}>{tag.name} {tag.direct_domains.length > 0 ? "(" + String(tag.direct_domains.length) + ")" : ""}</button>

    <form method="POST" action="?/delete" use:enhance>
        <input name="id" type="hidden" value="{tag.id}">
        <input class="delete" type="submit" value="❌">
    </form>
    {#if tag.direct_domains.length == 0 || tag.children.length > 0}
    <TagList list={tag.children} tag_name={tag.id} updateSelectedTag={updateSelectedTag}/>
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
        form {
            display: inline;
            .delete {
                background: var(--background-darker);
                color: var(--grey-0);
                border: none;
                border-radius: 100%;
                cursor: pointer;
            }
        }
    }
</style>