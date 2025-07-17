<script>
    let { domain } = $props();

    function is_image(webObject) {
        if (webObject.image != "" && webObject.image != null) {
            return 'has-image';
        } else {
            return 'no-image';
        }
    }
</script>

<div class="o-card--domain-header {is_image(domain)}">
    {#if domain.image != "" && domain.image != null}
    <a href="/domain/{domain.id}">
        <img class="domain" src="{domain.image}" alt="{domain.title}">
    </a>
    {/if}
    <div class="o-card--domain-header-title"><a href="/domain/{domain.id}">{domain.title}</a></div>
</div>

<style lang="scss">
    .o-card--domain-header {
    display: flex;
    width: fit-content;
    margin-inline: auto;
    &.no-image {
        text-align: center;
    }
    img.domain {
        width: 2em;
        border-radius: 0.5em;
    }
    .o-card--domain-header-title {
        margin-block: auto;
        padding-inline: 0.75em;
        font-size: 0.75em;
        text-transform: uppercase;
        font-weight: 600;
        
        a {
            color: white;
            text-decoration: none;
        }
    }
}
</style>