<script>
    import Tag from "./Tag.svelte";
    import AddCreateForm from "./AddCreateForm.svelte";
    let {list, tag_name} = $props();

    function slugify(string) {
        return string.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    }

    let name = $state("");
    let slug = $derived(slugify(name));

</script>

<ul>
    {#each list as child}
        <Tag tag={child} />
    {/each}
    <li>
        <AddCreateForm />
        <form class="o-hidden-add-form" method="POST" use:enhance>
            <input list="flavours" name="name" type="text" bind:value="{name}">
            <input type="hidden" name="slug" value="{name}">
            {#if tag_name != null}
            <input type="hidden" name="parents" value="{tag_name}">
            <input type="hidden" name="is_top_level" value="false">
            {:else}
            <input type="hidden" name="is_top_level" value="true">
            {/if}
            <input type="submit">
        </form>
    </li>
</ul>

<style lang="less">
    ul {
        margin-bottom: 1em;
        list-style: none;
    }
</style>