<script>
    let { domain } = $props();

    function is_image(webObject) {
        if (webObject.image != "" && webObject.image != null) {
            return 'has-image';
        } else {
            return 'no-image';
        }
    }

    let src = $derived(domain.image);
</script>

<div class="o-card--domain-header {is_image(domain)}">
    {#if domain.image != "" && domain.image != null}
    <a href="/domain/{domain.id}">
        <img class="domain" {src} alt={domain.title}>
    </a>
    {/if}
    <div class="o-card--domain-header-title"><a href="/domain/{domain.id}">{domain.title}</a></div>
</div>