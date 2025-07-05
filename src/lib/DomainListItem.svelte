<script>
	let { domain } = $props();

    function getDateString(datetime) {
        let dateStr = "null";
        if (datetime != null) {
            const date = new Date(datetime);
            dateStr = String(date.getDate()) + "/" + String(date.getMonth()+1) + "/" + String(date.getFullYear())
        }
        return dateStr;
    }
</script>

<li class="o-webpage-list-item">
    <div class="o-webpage-list-item--url">
        <a href="{domain.url}" title={domain.url}>{domain.url}</a>
    </div>
    <div class="o-webpage-list-item--head">
        <a href="/domain/{domain.id}/" class="title" title={domain.title}>{domain.title}</a><div class="dots"></div> <time datetime={domain.time_updated}>{getDateString(domain.time_updated)}</time>
    </div>
</li>

<style lang="scss">
    .o-webpage-list-item--head {
        display: flex;
    }
    .dots {
        margin-inline: 0.25em;
        margin-bottom: 4px;
        border-bottom: 2px dotted;
        flex-grow: 1;
    }

</style>