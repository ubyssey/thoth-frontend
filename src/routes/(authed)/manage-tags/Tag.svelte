<script>
    import TagList from "./TagList.svelte";
    import { enhance } from "$app/forms";
    let {tag_id, tags, updateSelectedTag} = $props();

    const tag = $derived(tags.filter((t) => t.id==tag_id)[0]);

</script>

<li>
    <button onclick={() => updateSelectedTag(tag)}>{tag.name} {tag.direct_domains.length > 0 ? "(" + String(tag.direct_domains.length) + ")" : ""}</button>

    <form class="o-form-delete-button" method="POST" action="?/delete" use:enhance>
        <input name="id" type="hidden" value="{tag.id}">
        <input class="delete" type="submit" value="❌">
    </form>
    {#if tag.direct_domains.length == 0 || tag.children.length > 0}
    <TagList list={tag.children} tag_name={tag.id} tags={tags} updateSelectedTag={updateSelectedTag}/>
    {/if}
</li>

<style lang="scss">
    li {
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
        button {
            padding:  0.5em 0.25em;
            display: inline-block;
            
            color: var(--text-color);             

            background: none;
            border: none;

            cursor: pointer;

            &:hover {
                background-color: var(--grey-2);
                color: var(--background-darker);
            }
        }
    }
</style>