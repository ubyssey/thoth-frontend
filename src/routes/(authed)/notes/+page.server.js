import { redirect } from '@sveltejs/kit';

export async function load({params, fetch}) {

    let notes = null;
    console.log("hello?");
    const notes_url = "http://thothbackend:8000/api/notes/?format=json";
    try {
        console.log("truing to fetch?");
        const notes_response = await fetch(notes_url, {method: 'GET', mode: 'cors'});
        console.log(notes_response);
        if (!notes_response.ok) {
        throw new Error(`Response status: ${notes_response.status}`);
        }

        notes = await notes_response.json();
        console.log(notes);
    } catch (error) {
        console.log("failed layout oops");
        console.error(error.message);
        console.log(error);
    }


    return {
        "notes": notes.results,
    }
}

export const actions = {
    publish: async({fetch, request}) => {

        let data = await request.formData();

        const notes_api_url = "http://thothbackend:8000/api/notes/";
        try {
            const response = await fetch(notes_api_url, {method: 'POST', mode: 'cors', body:data});
            //console.log(response);
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