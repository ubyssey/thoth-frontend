<script>
    import {getTimeSince, getDateString} from "$lib/timeMethods.js";
	let { webpage, domainUrl } = $props();
</script>

<li class="o-webpage-list-item">
    <div class="o-webpage-list-item--url">
        <a href="{webpage.url}" title={webpage.url}>{domainUrl == null ? webpage.url: webpage.url.replace(domainUrl, "..")}</a>
    </div>
    <div class="o-webpage-list-item--head">
        <span class="title" title={webpage.title}>{webpage.title}</span>&#8197; <time datetime={webpage.time_updated}>{getTimeSince(webpage.time_updated)}</time>
    </div>
</li>
