<script>
    import TopBar from "$lib/TopBar.svelte";
    import Header from "$lib/Header.svelte";
    import WebpageWall from "$lib/WebpageWall.svelte";
    import { get } from "svelte/store";
    let {data} = $props();

    let info = $derived({
        "title": data.query,
        "description": "Searching for webpages matching '" + data.query + "'",
    });

    async function getAnswer(query) {
            
        console.log("hello?");
        const url = "/api/answer/?q=" + query + "&format=json";
        try {
            console.log("truing to fetch?");
            const response = await fetch(url, {method: 'GET', mode: 'cors'});
            //console.log(response);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json.answers);
            return json.answers;
        } catch (error) {
            console.log("failed oops");
            console.error(error.message);
            console.log(error);
            return [];
        }
    }

    let domainQuery = $state("");
    let promisedAnswers = $derived(getAnswer(data.query));

</script>

<Header info={info} />

<div class="c-answer-bar">
    {#await promisedAnswers}
    <p>waiting</p>
    {:then answers}
    {#each answers as answer}
        <div class="o-answer-bar--answer">
        <p>{answer.answer}</p>
        <h3>{answer.title}</h3>
        <a href="{answer.url}">{answer.url}</a>
        </div>
    {/each}
    {/await}
</div>

<style lang="scss">
    .c-answer-bar {
        margin: 2.5em;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2em;
        .o-answer-bar--answer {
            padding: 1.5em;
            width: 26%;
            max-width: 300px;
            border-radius: 1em;
            background: var(--background-darker);
            line-height: 1.5em;
            position: relative;

            &:before {
                content: "“";
                font-size: 5em;
                font-weight: 600;
                line-height: 0.5em;
                color: var(--grey-2);

                position: absolute;
                right: calc(100% - 0.25em);
                bottom: calc(100% - 0.5em);
                text-shadow: -0.1em -0.1em 0 var(--background-darker);
            }

            p {
                margin: 0;
            }
        }
    }
</style>

<WebpageWall webpagesByMonth={data.webpagesByMonth} />