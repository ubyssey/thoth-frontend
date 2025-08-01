import { getPrettyDateString } from '$lib/timeMethods.js';

export async function load({params}) {
    console.log("hello?");

    const search_api_url = "http://thothbackend:8000/api/webpages/?search=" + params.query + "&format=json";

    let search = [];
    try {
        console.log("truing to fetch?");
        const search_response = await fetch(search_api_url, {method: 'GET', mode: 'cors'});
        //console.log(response);
        if (!search_response.ok) {
        throw new Error(`Response status: ${search_response.status}`);
        }

        search = await search_response.json();

    } catch (error) {
        console.log("failed oops");
        console.error(error.message);
        console.log(error);
    }

    return {
        "query": params.query,
        "webpagesByMonth": Object.groupBy(search.results, (({time_updated}) => getPrettyDateString(time_updated))),
    };
}