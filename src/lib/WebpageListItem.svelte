<script>
	let { webpage, domain } = $props();

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
        <a href="{webpage.url}" title={webpage.url}>{webpage.url.replace(domain.url, "..")}</a>
    </div>
    <div class="o-webpage-list-item--head">
        <span class="title" title={webpage.title}>{webpage.title}</span> <time datetime={webpage.time_updated}>{getDateString(webpage.time_updated)}</time>
    </div>
</li>
