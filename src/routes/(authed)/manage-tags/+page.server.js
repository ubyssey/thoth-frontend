export async function load() {
    console.log("hello?");
    const url = "http://backend:8000/api/tags-nested/?is_root=true&format=json";
    try {
        console.log("truing to fetch?");
        const response = await fetch(url, {method: 'GET', mode: 'cors'});
        //console.log(response);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        return {
            "tags": json.results
        };
    } catch (error) {
        console.log("failed oops");
        console.error(error.message);
        console.log(error);
    }
}

export const actions = {
    create: async({fetch, request}) => {
        let data = await request.formData();
        if (data.has("parents")) {
            console.log(data.get("parents"));
            data.set("parents", [parseInt(data.get("parents"))]);
        }
        console.log(data);

        const login_api_url = "http://backend:8000/api/tags/";
        try {
            const response = await fetch(login_api_url, {method: 'POST', mode: 'cors', body:data});
            console.log(response);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

        } catch (error) {
            console.log("failed login oops");
            console.error(error.message);
            console.log(error);
        }
    },

    delete: async({fetch, request}) => {
        let data = await request.formData();
        console.log(data);

        const login_api_url = "http://backend:8000/api/tags/" + data.get("id") + "/";
        try {
            const response = await fetch(login_api_url, {method: 'DELETE', mode: 'cors'});
            console.log(response);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);

        } catch (error) {
            console.log("failed login oops");
            console.error(error.message);
            console.log(error);
        }
    }
}