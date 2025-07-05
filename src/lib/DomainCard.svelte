<script>
    import WebpageListItem from "$lib/WebpageListItem.svelte";
	let { domain } = $props();
</script>

<style lang="scss">
    .o-card {
        padding: 1em; 
        max-width: 300px;
        flex-grow: 1;
  
        border-radius: 1em;

        background-color: #161618;
        color: white;

        h3 {
            text-align: center;
            text-overflow: ellipsis;
            overflow: clip;
            a {
                color: white;
            }
        }

        ul {
            padding: 0;
            list-style: none;
        }
    }
</style>

<div class="o-card">
    <h3><a href="/domain/{domain.id}/" title="{domain.url}">{domain.title}</a></h3>
    
    <ul>
        {#each domain.webpages as webpage}
            <WebpageListItem webpage={webpage} domain={domain}/>
        {/each}
    </ul>
</div>