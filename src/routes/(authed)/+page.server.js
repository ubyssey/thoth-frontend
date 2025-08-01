import { redirect } from '@sveltejs/kit';

import { getPrettyDateString } from '$lib/timeMethods';

export async function load() {

    let webpages = [];
    console.log("hello?");
    const url = "http://thothbackend:8000/api/webpages/?ordering=-time_updated&format=json";
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
    }

    return {
        "webpagesByDay": Object.groupBy(webpages, (({time_updated}) => getPrettyDateString(time_updated)))
    }

    }