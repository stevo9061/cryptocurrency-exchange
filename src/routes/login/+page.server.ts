import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateCredentials, createSession } from '$lib/server/auth'; 

// kein preload nötig
export const load: PageServerLoad = async () => ({});

// Form-Action für POST /login
export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = String(form.get('email'));
        const password = String(form.get('password'));

        // 1) Credentials prüfen (DB-Logik in $lib/server/auth)
        const userId = await validateCredentials(email, password);
        if (!userId) {
            return fail(401, { error: 'Invalid credentials' });
        }

        // 2) Session erstellen
        const sessionToken = await createSession(userId);
        cookies.set('session', sessionToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: import.meta.env.PROD
        });

        // 3) Weiter zum Dashboard
        throw redirect(303, '/dashboard');
    }

};