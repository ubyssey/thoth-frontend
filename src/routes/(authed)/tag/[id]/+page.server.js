import { monthYear } from '$lib/timeMethods.js';

export async function load({params}) {
    console.log("hello?");
    const url = "http://backend:8000/api/tags-nested/" + params.id + "/?format=json";
    try {
        console.log("truing to fetch? " + url);
        const response = await fetch(url, {method: 'GET', mode: 'cors'});
        //console.log(response);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const tag = await response.json();
        //console.log(tag);

        return {
            "tag": tag,
            "webpagesByMonth": Object.groupBy(tag.webpages, monthYear)
        };
    } catch (error) {
        console.log("failed oops " + url);
        console.error(error.message);
        console.log(error);
    }
    }