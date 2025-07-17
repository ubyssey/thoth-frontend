<script>
    import TopBar from "$lib/TopBar.svelte";
    let {info} = $props();

    function titleSize(title) {
        if (title.length > 45) {
            return "small";
        } else {
            return "large";
        }
    }
</script>

<div class="c-page-header">
    {#if info.image}
    {#if info.image.length > 0}
    <img class="crest left" src="{info.image}" alt="{info.title}">
    <img class="crest right" src="{info.image}" alt="{info.title}">
    {/if}
    {/if}
    <h2 class="{titleSize(info.title)}">{info.title}</h2>
    {#if info.url}
    <p class="url"><a href="{info.url}">{info.url}</a></p>
    {/if}
    {#if info.description}
    <p class="description">{info.description}</p>
    {/if}
</div>


<style lang="scss">
    .c-page-header {
        position: relative;
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
        img.crest {
            position: absolute;
            z-index: -1;
            height: 7em;
            border-radius: 1em;
            &.left {
                right: 100%;
            }
            &.right {
                left: 100%;
            }
        }
    }
</style>