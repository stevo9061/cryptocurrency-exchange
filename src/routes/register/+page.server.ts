import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createUser, createSession } from '$lib/server/auth';

// lädt initial keine Daten, nur Platzhalter
export const load: PageServerLoad = async ({}) => ({});

// die Form-Action für POST /register
export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = String(form.get('email'));
        const password = String(form.get('password'));

        try {
            // 1) Neuen User anlegen (DB-Logik in $lib/server/auth)
            const userId = await createUser(email, password);

            // 2) Session-Token erzeugen und als http-only Cookie setzen
            // Nach erfolgreicher Registrierung direkt einloggen:
            const sessionToken = await createSession(userId);
            cookies.set('session', sessionToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: import.meta.env.PROD 
            });

            // 3) Nach Erfolg weiter zum Dashboard
            throw redirect(303, '/dashboard');
        } catch (err: any) {
            // 4) Bei Fehlern zurück ans Formular mit Fehlermeldung
            return fail(400, { error: err.message });
        }
        }
};