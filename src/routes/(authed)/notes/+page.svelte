<script>
    import { onMount } from 'svelte';
    import "quill/dist/quill.bubble.css";

    let {data} = $props();

    function getText(note) {
        console.log(note);
        console.log(note.text)
        return note.text;
    }
</script>


<div class="c-note-feed">
    {#each data.notes as note}
    <div class="o-note">
        <div>{note.user.username} {note.time_published}</div>
        {@html note.text}
    </div>
    {/each}
</div>
