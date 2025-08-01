<script>
    import DomainCard from "$lib/DomainCard.svelte";
    import TopBar from "$lib/TopBar.svelte";
    let {title, domainsByMonth} = $props();

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
            margin-inline: auto;
            padding-block: 1em;
            border-block: 1px solid;

            width: fit-content;
            
            line-height: 1.5em;
            text-align: justify;
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

<TopBar defaultSearchQuery={title} />
<div class="c-main">

    <div class="c-page-header">
        <h2 class="{titleSize(title)}">{title}</h2>
    </div>

    {#each Object.keys(domainsByMonth) as month}
    <div class="o-month">
        <h3>{month}</h3>
        <div class="c-domain-wall">
            {#each domainsByMonth[month].sort((({time_updated}) => time_updated)).reverse() as domain}
                <DomainCard domain={domain}/>      
            {/each}
        </div>
    </div>
    {/each}
</div>