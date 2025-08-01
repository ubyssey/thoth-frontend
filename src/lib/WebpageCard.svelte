<script>
    import {getTimeSince, getDateString, getTimeString} from "$lib/timeMethods.js";
    import CardDomainHeader from "./CardDomainHeader.svelte";
	let { webpage } = $props();

    function is_image(webObject) {
        if (webObject.image != "" && webObject.image != null) {
            return 'has-image';
        } else {
            return 'no-image';
        }
    }
</script>

<style lang="scss">
    .o-card {
        padding: 1em;
        max-width: 370px;
        flex-grow: 1;
  
        border-radius: 1em;

        background-color: var(--background-darker);
        color: var(--text-color);

        h3 {
            margin-block: 0.5em;
            padding-block: 0.25em;
            border-block: 1px solid;
            text-align: center;
            text-overflow: ellipsis;
            overflow: clip;
        }
        p {
            line-height: 1.5em;
            overflow: clip;
            text-overflow: ellipsis;
        }
        img {
            margin-block: auto;
            object-fit: cover;
            aspect-ratio: 1;
            height: auto;
        }
        img.small {
            margin: 0 0 0.5em 0.5em;
            width: 5em;
            border-radius: 100%;
            float: right;
        }
    }
</style>

<div class="o-card">
    {#if webpage.domain }
    <CardDomainHeader domain={webpage.domain} />
    {/if}
    <h3>{webpage.title}</h3>
    {#if webpage.image != "" && webpage.image != null}
    <img class="small" src="{webpage.image}" alt={webpage.title}>
    {/if}
    <p>
        <span class="o-card--time">{#if webpage.time_updated != webpage.time_published && webpage.time_updated != null}Mod. <time datetime={webpage.time_updated}>{getTimeString(webpage.time_updated) + (getDateString(webpage.time_updated) != getDateString(webpage.time_published) ? " " + getDateString(webpage.time_updated): "")}</time>{#if webpage.time_published != null },&#8197;{/if}{/if}{#if webpage.time_published != null }Pub. <time datetime={webpage.time_published}>{(getDateString(webpage.time_updated) == getDateString(webpage.time_published) ? getTimeString(webpage.time_published) + " " : "") + getDateString(webpage.time_published)}</time>{/if}</span>
        {webpage.description}
    </p>
    <p><a href="{webpage.url}" title="{webpage.url}">{webpage.url}</a></p>

</div>