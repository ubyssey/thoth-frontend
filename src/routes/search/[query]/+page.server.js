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
    const webpages_api_url = "http://backend:8000/api/webpages/?search=" + params.query + "&format=json";

    try {
        console.log("truing to fetch?");
        const response = await fetch(webpages_api_url, {method: 'GET', mode: 'cors'});
        //console.log(response);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const webpages = await response.json();

        return {
            "query": params.query,
            "webpages": webpages.results,
            "webpagesByMonth": Object.groupBy(webpages.results, monthYear),
        };
    } catch (error) {
        console.log("failed oops");
        console.error(error.message);
        console.log(error);
    }
}