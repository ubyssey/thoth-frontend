<script>
    import Header from "$lib/Header.svelte";
    import WebpageWall from "$lib/WebpageWall.svelte";
    import { getPrettyDateString } from '$lib/timeMethods';
    let {data} = $props();

    const info = {
        "title": "Thoth",
        "description": "Perhaps the beginning but never the end..."
    }

    let webpagesByDay = $derived(Object.groupBy(data.webpages, (({time_updated}) => getPrettyDateString(time_updated))));
</script>

<Header info={info} />
<WebpageWall webpagesByMonth={webpagesByDay} />
