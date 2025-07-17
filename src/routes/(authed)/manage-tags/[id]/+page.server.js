export async function load({params}) {

    let tag = null;
    const tagUrl = "http://backend:8000/api/tags-nested/" + params.id  + "/?format=json";

    try {
        console.log("truing to fetch?");
        const tag_response = await fetch(tagUrl, {method: 'GET', mode: 'cors'});
        console.log(tag_response);
        if (!tag_response.ok) {
        throw new Error(`Response status: ${tag_response.status}`);
        }

        tag = await tag_response.json();
        console.log(tag);

    } catch (error) {
        console.log("failed oops");
        console.error(error.message);
        console.log(error);
    }

    return {
        "tag": tag,
    }
}

export const actions = {
    add_domain: async({fetch, request}) => {
        const data = await request.formData();
        console.log(data);

        const add_domain_api_url = "http://backend:8000/api/tags/add-domain/";
        try {
            const response = await fetch(add_domain_api_url, {method: 'PUT', mode: 'cors', body:data});
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