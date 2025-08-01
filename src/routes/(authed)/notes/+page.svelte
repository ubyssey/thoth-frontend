<script>
    import { onMount } from 'svelte';
    import "quill/dist/quill.bubble.css";

    import Header from '$lib/Header.svelte';
    import Note from './Note.svelte';

    let {data} = $props();

    function getText(note) {
        console.log(note);
        console.log(note.text)
        return note.text;
    }

    const info = {"title": "Notes"};
</script>


<Header info={info} />
<div class="c-note-feed">
    {#each data.notes as note}
        <Note note={note} />
    {/each}
</div>
