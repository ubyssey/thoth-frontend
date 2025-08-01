<script>
    import { getPrettyDateString } from "$lib/timeMethods";
    let {note} = $props();
</script>

<div class="o-note--conatiner">
    <div class="o-note">
        <div class="o-note--header">{note.user.username} <time datetime={note.time_published}>{getPrettyDateString(note.time_published)}</time></div>
        {@html note.text.replaceAll("&nbsp;", " ")}
    </div>

    <ul class="o-note-links">
    {#each note.links as link}
        <li class="o-note-link">
            {#if link.domain.image && link.domain.image != ""}
            <img class="o-note-link--img" src="{link.domain.image}" alt="{link.domain.title}">
            {/if}
            <div class="o-note-link--info">
                <div class="o-note-link--info-domain">
                    <a href="/domain/{link.domain.id}" title="{link.domain.title}">{link.domain.url.split("//")[1]}</a>
                </div>
                <div class="o-note-link-info-title">
                    <a href="{link.url}">{link.title}</a>
                </div>
                <p>
                    {link.description}
                </p>
            </div>
        </li>
    {/each}
    </ul>

</div>