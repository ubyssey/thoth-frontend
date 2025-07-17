<script>
    import TopBar from "$lib/TopBar.svelte";
    import Header from "$lib/Header.svelte";
    import WebpageWall from "$lib/WebpageWall.svelte";
    let {data} = $props();

    let info = $derived({
        "title": data.query,
        "description": "Searching for webpages matching '" + data.query + "'",
    });
</script>

<TopBar defaultSearchQuery={info.title} />
<Header info={info} />

{#each data.answers as answer}
    <h3>{answer.title}</h3>
{/each}

<WebpageWall webpagesByMonth={data.webpagesByMonth} />