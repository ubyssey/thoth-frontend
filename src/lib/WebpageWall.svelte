<script>
    import WebpageCard from "$lib/WebpageCard.svelte";
    import TopBar from "$lib/TopBar.svelte";
    let {webpagesByMonth} = $props();

    function titleSize(title) {
        if (title.length > 45) {
            return "small";
        } else {
            return "large";
        }
    }
</script>

<style lang="scss">
    .o-month {
        margin-block: 2em;
    }
</style>

{#each Object.keys(webpagesByMonth) as month}
<div class="o-month">
    <h3>{month}</h3>
    <div class="c-domain-wall">
        {#each webpagesByMonth[month] as webpage}
            <WebpageCard webpage={webpage}/>      
        {/each}
    </div>
</div>
{/each}