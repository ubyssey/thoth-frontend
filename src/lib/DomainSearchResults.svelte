<script>
    import {getTimeSince, getDateString} from "$lib/timeMethods.js";
    import CardDomainHeader from "./CardDomainHeader.svelte";
	let { webpages } = $props();
</script>

<div class="o-domain-search-results">
    <CardDomainHeader domain={webpages[0].domain} />
    <ul>
        {#each webpages as webpage}
        <li class="o-webpage-list-item">
            {#if webpage.image && webpage.image != ""}
            <img class="o-domain-search-results--img" src="{webpage.image}" alt="{webpage.title}">
            {/if}
            <div class="o-webpage-list-item--head">
                <span class="title" title={webpage.title}>{webpage.title}</span>
            </div>
            <div class="o-webpage-list-item--url">
                <a href="{webpage.url}" title={webpage.url}>{webpage.url.replace(webpage.domain.url, "..")}</a>&#8197; <time datetime={webpage.time_updated}>{getTimeSince(webpage.time_updated)}</time>
            </div>
        </li>
        {/each}
    </ul>
</div>