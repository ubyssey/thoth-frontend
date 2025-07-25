import { REMOTE_CONTAINERS_SOCKETS } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function load({fetch, cookies}) {

    if (!cookies.get('token')) {
        console.log(cookies.get('token'));
        console.log("what the");
        redirect(307,'/login');
    }

    let user = null;
    console.log("hello?");
    const auth_url = "http://thoth_backend:8000/authed-user/?format=json";
    try {
        console.log("truing to fetch?");
        const auth_response = await fetch(auth_url, {method: 'GET', mode: 'cors'});
        console.log(auth_response);
        if (!auth_response.ok) {
        throw new Error(`Response status: ${auth_response.status}`);
        }

        user = await auth_response.json();
        user.initials = user.username.split(" ").map((name) => name[0].toUpperCase()).join("");
 
    } catch (error) {
        console.log("failed layout oops");
        console.error(error.message);
        console.log(error);
    }

    if (user == null) {
        redirect(307,'/login');
    }

    console.log("hello?");
    const url = "http://thoth_backend:8000/api/tags-nested/?is_top_level=true&format=json";
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
            "tags": json.results,
            "user": user,
        };
    } catch (error) {
        console.log("failed layout oops");
        console.error(error.message);
        console.log(error);
    }
}
