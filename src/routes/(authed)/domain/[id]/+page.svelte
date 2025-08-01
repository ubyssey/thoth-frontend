<script>
    import { getPrettyDateString } from '$lib/timeMethods.js';

    import TopBar from "$lib/TopBar.svelte";
    import Header from "$lib/Header.svelte";
    import WebpageWall from "$lib/WebpageWall.svelte";
    let {data} = $props();

    let webpagesByDay = $derived(Object.groupBy(data.webpages, (({time_updated}) => getPrettyDateString(time_updated))));
</script>

<!--<TopBar defaultSearchQuery={data.domain.title} />-->
<Header info={data.domain} />
<WebpageWall webpagesByMonth={webpagesByDay} />