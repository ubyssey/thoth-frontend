<script>
    import WebpageWall from "$lib/WebpageWall.svelte";
    let {data} = $props();
</script>

<WebpageWall title={data.query} webpagesByMonth={data.webpagesByMonth} />