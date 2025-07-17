<script>
    import {getTimeSince, getDateString} from "$lib/timeMethods.js";
	let { domain } = $props();
</script>

<li class="o-webpage-list-item">
    {#if domain.image != ""}
    <img src="{domain.image}" alt="{domain.title}">
    {/if}
    <div class="o-webpage-list-item--url">
        <a href="{domain.url}" title={domain.url}>{domain.url}</a>
    </div>
    <div class="o-webpage-list-item--head">
        <a href="/domain/{domain.id}/" class="title" title={domain.title}>{domain.title}</a><div class="dots"></div> <time datetime={domain.time_updated}>{getTimeSince(domain.time_updated)}</time>
    </div>
</li>

<style lang="scss">
    .o-webpage-list-item--head {
        display: flex;
    }
    .dots {
        margin-inline: 0.25em;
        margin-bottom: 4px;
        border-bottom: 2px dotted;
        flex-grow: 1;
    }
    .o-webpage-list-item img {
        margin: 0.25em 0.5em 0.25em 0;
        aspect-ratio: 1;
        width: 2em;
        height: auto;
        object-fit: contain;
        float: left;
        border-radius: 0.5em;
        font-size: 0.75em;
    }
</style>