<script>
    import {getTimeSince, getDateString} from "$lib/timeMethods.js";
	let { domain } = $props();
</script>

<li class="o-webpage-list-item">
    {#if domain.image != ""}
    <img class="o-domain-img" src="{domain.image}" alt="{domain.title}">
    {/if}
    <div class="o-webpage-list-item--url">
        <a href="{domain.url}" title={domain.url}>{domain.url}</a>
    </div>
    <div class="o-webpage-list-item--head u-dotted">
        <a href="/domain/{domain.id}/" class="title" title={domain.title}>{domain.title}</a><div class="dots"></div> <time datetime={domain.time_updated}>{getTimeSince(domain.time_updated)}</time>
    </div>
</li>