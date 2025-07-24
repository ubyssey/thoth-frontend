<script>
    import TopBar from "$lib/TopBar.svelte";
    import Header from "$lib/Header.svelte";
    import WebpageWall from "$lib/WebpageWall.svelte";
    let {data} = $props();
</script>

<!--<TopBar defaultSearchQuery={data.domain.title} />-->
<Header info={data.domain} />
<WebpageWall webpagesByMonth={data.webpagesByMonth} />