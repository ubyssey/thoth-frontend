<script>
	let { webpage } = $props();

    function getDateString(datetime) {
        let dateStr = "null";
        if (datetime != null) {
            const date = new Date(datetime);
            dateStr = String(date.getDate()) + "/" + String(date.getMonth()+1) + "/" + String(date.getFullYear())
        }
        return dateStr;
    }
</script>

<style lang="scss">
    .o-card {
        padding: 1em; 
        max-width: 300px;
        flex-grow: 1;
  
        border-radius: 1em;

        background-color: #161618;
        color: white;

        h3 {
            padding-block: 0.25em;
            border-block: 1px solid;
            text-align: center;
            text-overflow: ellipsis;
            overflow: clip;
            a {
                color: white;
            }
        }
        p {
            line-height: 1.5em;
            overflow: clip;
            text-overflow: ellipsis;
        }
        time {
            font-size: 0.75em;
            margin-right: 1em;
        }
    }
</style>

<div class="o-card">
    <h3>{webpage.title}</h3>
    <p><time datetime={webpage.time_updated}>{getDateString(webpage.time_updated)}</time> {webpage.description}</p>
    <p><a href="{webpage.url}" title="{webpage.url}">{webpage.url}</a></p>
</div>