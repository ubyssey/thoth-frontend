<script>
    import WebpageCard from "$lib/WebpageCard.svelte";
    let {data} = $props();

    function titleSize(title) {
        if (title.length > 45) {
            return "small";
        } else {
            return "large";
        }
    }
</script>

<style lang="scss">
    .c-main {
        h2 {
            text-align: center;
        }
    }
    .c-page-header {
        margin-inline: auto;
        max-width: 800px;
        h2 {
            text-align: center;
            font-size: 4em;
            margin-block: 0.25em;
            &.small {
                font-size: 3em;
            }
        }
        p.description {
            padding-block: 1em;
            border-block: 1px solid;
            line-height: 1.5em;
        }
        p.url {
            text-align: center;
            font-size: 1.25em;
        }
    }
    .o-month {
        margin-block: 2em;
    }
</style>

<div class="c-main">
    <div class="c-page-header">
        <h2 class="{titleSize(data.domain.title)}">{data.domain.title}</h2>
        <p class="url"><a href="{data.domain.url}">{data.domain.url}</a></p>
        <p class="description ">{data.domain.description}</p>
    </div>

    {#each Object.keys(data.webpagesByMonth) as month}
    <div class="o-month">
        <h3>{month}</h3>
        <div class="c-domain-wall">
            {#each data.webpagesByMonth[month] as webpage}
                <WebpageCard webpage={webpage}/>      
            {/each}
        </div>
    </div>
    {/each}
</div>