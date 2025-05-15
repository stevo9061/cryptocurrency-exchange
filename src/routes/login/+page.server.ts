import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateCredentials, createSession } from '$lib/server/auth'; 

// kein preload nötig
export const load: PageServerLoad = async () => ({});

// Form-Action für POST /login
export const actions: Actions = {
    default: async ({ request, cookies }) => {
        console.log('Login-Action gestartet');
        const form = await request.formData();
        const email = String(form.get('email'));
        const password = String(form.get('password'));

        // 1) Credentials prüfen (DB-Logik in $lib/server/auth)
        const userId = await validateCredentials(email, password);
        console.log('validateCredentials:', userId);
        if (!userId) {
            return fail(401, { error: 'Invalid credentials' });
        }

        // 2) Session erstellen
        const sessionToken = await createSession(userId);
        console.log('sessionToken erstellt:', sessionToken);
        cookies.set('session', sessionToken.toString(), {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: import.meta.env.PROD
        });

        // 3) Weiter zum Dashboard
        console.log('Cookie gesetzt, redirect wird geworfen');
        throw redirect(303, '/dashboard');
    }

};