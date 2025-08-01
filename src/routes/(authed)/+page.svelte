<script>
    import Header from "$lib/Header.svelte";
    import WebpageWall from "$lib/WebpageWall.svelte";
    let {data} = $props();

    const info = {
        "title": "Thoth",
        "description": "Perhaps the beginning but never the end..."
    }
</script>

<Header info={info} />
<WebpageWall webpagesByMonth={data.webpagesByDay} />
