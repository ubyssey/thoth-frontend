function monthYear({time_updated}) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const date = new Date(time_updated);
    return months[date.getMonth()] + " " + String(date.getFullYear());
}

export async function load({params}) {
    console.log("hello?");

    const search_api_url = "http://backend:8000/api/webpages/?search=" + params.query + "&format=json";

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
        "webpagesByMonth": Object.groupBy(search.results, monthYear),
    };
}