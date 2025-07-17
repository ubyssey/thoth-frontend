<script>
    import { enhance } from "$app/forms";

    import AddCreateForm from "../AddCreateForm.svelte";

    let {data} = $props();
    console.log(data);
</script>

<div class="c-main">
    <div>
        <a href="/manage-tags">All</a>
    </div>

    <h1>{data.tag.name}</h1>

    <ul>
        {#each data.tag.direct_domains as domain}
        <li>{domain.url}</li>
        {/each}

        <li>
            <AddCreateForm />
            <form class="o-hidden-add-form" method="POST" action="?/add_domain" use:enhance>
                <input name="url" type="text">
                <input name="tag" type="hidden" value="{data.tag.name}">
                <input type="submit">
            </form>
        </li>

    </ul>
</div>