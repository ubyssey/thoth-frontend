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

    const answers_api_url = "http://backend:8000/api/webpages/?smart-search=" + params.query + "&format=json";

    let answers = [];
    try {
        console.log("truing to fetch?");
        const answers_response = await fetch(answers_api_url, {method: 'GET', mode: 'cors'});
        //console.log(response);
        if (!answers_response.ok) {
        throw new Error(`Response status: ${answers_response.status}`);
        }

        answers = await answers_response.json();

    } catch (error) {
        console.log("failed oops");
        console.error(error.message);
        console.log(error);
    }

    return {
        "query": params.query,
        "answers": answers.results.slice(0,5),
        "webpagesByMonth": Object.groupBy(answers.results, monthYear),
    };
}