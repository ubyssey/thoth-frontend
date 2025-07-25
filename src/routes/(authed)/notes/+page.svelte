<script>
    import Note from './Note.svelte';
    import { onMount } from 'svelte';
    import "quill/dist/quill.bubble.css";

    let {data} = $props();

    function getText(note) {
        console.log(note);
        console.log(note.text)
        return note.text;
    }
</script>

<h1>Notes</h1>
<div class="c-note-feed">
    {#each data.notes as note}
        <Note note={note} />
    {/each}
</div>
