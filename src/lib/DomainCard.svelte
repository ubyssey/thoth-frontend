<script>
    import WebpageListItem from "$lib/WebpageListItem.svelte";
    import CardDomainHeader from "./CardDomainHeader.svelte";
	let { domain } = $props();
</script>

<style lang="scss">
    .o-card {
        padding: 1em;
        width: 250px;
        max-width: 300px;
        flex-grow: 1;
  
        border-radius: 1em;

        background-color: var(--background-darker);
        color: var(--text-color);

        h3 {
            text-align: center;
            text-overflow: ellipsis;
            overflow: clip;
            a {
                color: var(--text-color);
            }
        }

        ul {
            padding: 0;
            list-style: none;
        }

        img {
            margin: 0.8em 0;
            aspect-ratio: 1;
            width: 3em;
            height: auto;
            object-fit: contain;
            float: right;
            border-radius: 0.5em;
            font-size: 0.75em;
        }
    }
</style>

<div class="o-card">
    <CardDomainHeader domain={domain} />    
    <ul>
        {#each domain.webpages as webpage}
            <WebpageListItem webpage={webpage} domainUrl={domain.url}/>
        {/each}
    </ul>
</div>