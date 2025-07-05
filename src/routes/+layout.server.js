export async function load() {
    console.log("hello?");
    const url = "http://backend:8000/api/domains/?format=json";
    try {
        console.log("truing to fetch?");
        const response = await fetch(url, {method: 'GET', mode: 'cors'});
        //console.log(response);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        return {"domains": json.results};
    } catch (error) {
        console.log("failed oops");
        console.error(error.message);
        console.log(error);
    }
    }