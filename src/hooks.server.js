import { Handle } from '@sveltejs/kit';

export async function handleFetch({event, request, fetch}) {

    console.log("handle fetch");
    if (event.cookies.get("token")) {
        request.headers.set("Authorization", "Token " + event.cookies.get("token"));
        console.log("handle fetch token");
        console.log(request);
    }
        return await fetch(request);
}