import { monthYear } from '$lib/timeMethods.js';

export async function load({params}) {
    console.log("hello?");
    const webpages_api_url = "http://backend:8000/api/webpages/?domain_id=" + params.id + "&format=json";
    const domain_api_url = "http://backend:8000/api/domains/" + params.id + "?format=json";

    try {
        console.log("truing to fetch?");
        const response = await fetch(webpages_api_url, {method: 'GET', mode: 'cors'});
        //console.log(response);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const webpages = await response.json();


        console.log("truing to fetch?");
        const daomainResponse = await fetch(domain_api_url, {method: 'GET', mode: 'cors'});
        //console.log(daomainResponse);
        if (!daomainResponse.ok) {
            throw new Error(`Response status: ${daomainResponse.status}`);
        }

        const domain = await daomainResponse.json();
        console.log(domain);

        return {
            "domain": domain,
            "webpages": webpages.results,
            "webpagesByMonth": Object.groupBy(webpages.results, monthYear),
        };
    } catch (error) {
        console.log("failed oops");
        console.error(error.message);
        console.log(error);
    }
}