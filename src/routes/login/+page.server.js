import { redirect } from '@sveltejs/kit';

export async function load({cookies}) {
    if (cookies.get("token")) {
        throw redirect(303, '/');
    }
}

export const actions = {
    default: async({cookies, request}) => {
        const data = await request.formData();
        console.log(data);

        const login_api_url = "http://backend:8000/login/"
        try {
            const response = await fetch(login_api_url, {method: 'POST', mode: 'cors', body:data});
            //console.log(response);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const token = await response.json();
            console.log(token);
            console.log(token.token);

            cookies.set('token', String(token.token), {path: '/'});

        } catch (error) {
            console.log("failed login oops");
            console.error(error.message);
            console.log(error);
        }


    }
}