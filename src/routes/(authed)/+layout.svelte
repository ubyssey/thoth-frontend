<script>
    import { enhance } from "$app/forms";
    import DomainListItem from "$lib/DomainListItem.svelte";
    import DomainSearchResults from "$lib/DomainSearchResults.svelte";
    import TagNestedListing from "$lib/TagNestedListing.svelte";
    import WebpageListItem from "$lib/WebpageListItem.svelte";
    import "quill/dist/quill.bubble.css";
    import { onMount } from 'svelte';
    let {data, children} = $props();

    let tagNumber = $state(0);
    console.log("data");
    console.log(data);

    let tag = $derived(data.tags.length > 0 ? data.tags[tagNumber] : null);

    let info_shelf_state = $state(true);
    let info_shelf_text = $state("");
    let info_shelf_text_sizing = $derived(info_shelf_text.length == 0? "10px" : String(Math.min(Math.floor(200/Math.sqrt(info_shelf_text.length)), 15)) + "px");

    function getSelectedText() {
        let selectedText = "";

        if (window.getSelection) {
            selectedText = window.getSelection().toString();
        } else if (document.getSelection) {
            selectedText = document.getSelection().toString();
        } else if (document.selection) {
            selectedText = document.selection.createRange().text;
        };

        if (selectedText != "" ) {
            console.log(selectedText);
            info_shelf_text = selectedText;
            info_shelf_state = true;
        }
    }

    async function searchWebapges(query) {
        if (query == "") return [];

        console.log("hello?");
        const url = "https://api.thoth.ubyssey.ca/api/webpages/?page_size=10&smart-search=" + query + "&format=json";
        
        let webpages = []
        try {
            console.log("truing to fetch?");
            const response = await fetch(url, {method: 'GET', mode: 'cors'});
            //console.log(response);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            webpages = json.results;

            
        } catch (error) {
            console.log("failed oops");
            console.error(error.message);
            console.log(error);
            return [];
        }

        const webpagesByDomain = Object.groupBy(webpages, (w) => w.domain.id);
        return webpagesByDomain;
    }
    
    let editor;
    let quill = $state(null);
    const toolbarOptions = [['bold', 'italic'], ['link']];

    onMount(async () => {
        document.addEventListener("mouseup", getSelectedText);

        const { default: Quill } = await import("quill");
        
        quill = new Quill(editor, {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: "Tell your truth...",
            theme: 'bubble',
        });
    });

    let note_content = $state(null); 

    function publishNote() {
        if (quill == null) {
            return null;
        }
        const length = quill.getLength();
        
        note_content = quill.getSemanticHTML(0, length);
        document.getElementById("form-content").value = note_content;
        document.getElementById("form").submit();

        return note_content;
    }

    let promised_info_shelf_results = $derived(searchWebapges(info_shelf_text));

</script>

<div class="c-container">
    <nav class="c-sidebar-nav">
        <ul>
            <li><a href="/">Thoth</a></li>
            <li><a href="/notes/">Notes</a></li>
        </ul>
        <aside class="c-domain-sidebar">

            <div><a href="/manage-tags">edit</a></div>
            <div class="c-top-level-tags">
            {#each data.tags as top_level, index}
                {#if index != tagNumber}
                <button onclick={tagNumber = index}>{top_level.name}</button>
                {/if}
            {/each}
            </div>

            {#if tag}
            <h2><a href="/tag/{tag.id}">{tag.name}</a></h2>

            <ul>
            <TagNestedListing tag={tag}/>
            </ul>
            {/if}
        </aside>

        <div class="c-sidebar-nav--user">
            <span>{data.user.initials}</span>
        </div>
    </nav>

    <div class="c-main-flex">
        <main>
            {@render children()}
        </main>
        <div class="c-info-shelf">
            <div class="c-info-shelf--buttons">
                <button class="c-info-shelf--button" onclick={() => info_shelf_state = info_shelf_state == false}>{info_shelf_state}</button>
            </div>

            <div class="c-info-shelf--contents {info_shelf_state}">

                <div class="editor-wrapper">
                    <div class="c-editor-username">{data.user.username}</div>
                    <div bind:this={editor}></div>
                    <form id="form" method="POST" action="/notes?/publish" use:enhance>
                        <input name="text" id="form-content" type="hidden" value={note_content}>
                    </form>
                    <button class="o-publish-button" onclick={publishNote}>Publish</button>
                </div>
                <!--<textarea class="c-info-shelf--query" style="--size: {info_shelf_text_sizing}" bind:value={info_shelf_text}></textarea>-->

                {#if info_shelf_text != ""}
                <div class="c-info-shelf--query-search">Searching: <a href="/search/{info_shelf_text}">{info_shelf_text}</a></div>

                {#await promised_info_shelf_results}
                <p>Waiting</p>
                {:then info_shelf_results}
                <ul class="c-info-shelf--results">
                {#each Object.keys(info_shelf_results) as webpagesByDomain}
                    <DomainSearchResults webpages={info_shelf_results[webpagesByDomain]}/>
                {/each}
                </ul>
                {/await}
                {/if}
            </div>
        </div>
    </div>
</div>


<style lang="scss">
    .c-main-flex {
        display: flex;
        flex-grow: 1;
        main {
            flex-grow: 1;
        }
        .c-info-shelf--query-search {
            margin: 1em auto;
            text-align: center;
            font-size: 0.9em;
        }
        .c-editor-username {
            margin: 1em 0;
            
            font-size: 0.9em;
            color: var(--grey-2)
        }
        .o-publish-button {
            margin: 1em 0 0 auto;

            border: none;
            border-radius: 0.5em;

            background: var(--grey-1);
            color: var(--background-darker);
        }
        .c-info-shelf {
            margin-left: 1em;
            padding: 1em 1em 2em 1em;
            position: sticky;
            top: 0;
            max-width: 300px;
            height: 100vh;
            
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            background: var(--background-darker);
            box-sizing: border-box;

            .c-info-shelf--buttons {
                display: flex;
                justify-content: right;
                .c-info-shelf--button {
                    border: none;
                    border-radius: 0.5em;
                        
                    background: var(--grey-1);
                    color: var(--background-darker);
                }
            }

            .c-info-shelf--contents {
                &.true {
                    display: contents;
                }
                &.false {
                    display: none;
                }
            }

            .c-info-shelf--query {
                padding: 1em;
                
                width: 100%;
                height: 100px;
                resize: none;
                box-sizing: border-box;
                
                border: 1px solid var(--grey-0);
                border-radius: 0.5em;
                
                background: none;

                line-height: 1.5em;
                font-size: var(--size);
                font-family: sans-serif;
                color: var(--text-color);
            }
        }
    }
    .c-domain-sidebar {
        display: none;
        position: absolute;
        left: 100%;
        top: 0;
        bottom: 0;

        flex-direction: column;
        flex-shrink: 0;

        width: 400px;
        max-width: 20vw;
        max-height: 100vh;
        padding: 1em;

        background: var(--background);
        border-right: 2px solid var(--grey-0);

        h2 {
            margin-bottom: 0.5em;
            font-size: 1em;
        }

        &:hover {
            display: flex;
        }
    }
    .c-sidebar-nav {
        position: sticky;
        top: 0;
        z-index: 100;

        display: flex;
        flex-direction: column;
        height: 100vh;

        &:hover {
            .c-domain-sidebar {
                display: flex;
            }
        }

        > ul {
            padding: 1em;
            list-style: none;
            li {
                margin-block: 1em;
            }
        }

        .c-sidebar-nav--user {
            margin: auto auto 0 auto;
            padding: 1.5em 0.5em;
            text-align: center;
        }
    }
    .c-top-level-tags {
        margin-block: 0.5em;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.25em;
        button {
            padding: 0.5em 1em;
            max-width: 7.5em;
            border-radius: 0.5em;
            border: none;
            
            overflow: clip;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 0.75em;

            background: var(--background-darker);
            color: var(--text-color);

            cursor: pointer;
        }
    }
    .c-container {
        display: flex;
        min-height: 100%;
    }
    .c-header {
        padding-inline: 1em;
        text-align: center;
        h1 a{
            color: var(--text-color);
            text-decoration: none;
        }
    }
    main {
        width: -moz-available;
    }
</style>