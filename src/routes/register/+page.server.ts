import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createUser, createSession } from '$lib/server/auth';

// lädt initial keine Daten, nur Platzhalter
export const load: PageServerLoad = async ({}) => ({});

// die Form-Action für POST /register
export const actions: Actions = {
    default: async ({ request, cookies }) => {
        // 1) Form auslesen
        console.log('Registration-Action gestartet');
        const form = await request.formData();
        const email = String(form.get('email'));
        const password = String(form.get('password'));


        let userId: string;
        // 2) Neuen User anlegen (DB-Logik in $lib/server/auth)
        try {
            
            userId = await createUser(email, password);
            console.log('User created:', userId);
        } catch (err: any) {
            // 3) Bei Fehlern zurück ans Formular mit Fehlermeldung
            return fail(400, { error: err.message });
        }

            // 4) Session-Token erzeugen und als http-only Cookie setzen
            // Nach erfolgreicher Registrierung direkt einloggen:
            const sessionToken = await createSession(userId);
            console.log('sessionToken erstellt:', sessionToken);
            cookies.set('session', sessionToken.toString(), {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: import.meta.env.PROD 
            });

            // 4) Nach Erfolg weiter zum Dashboard
            console.log('Cookie gesetzt, redirect wird geworfen');
            throw redirect(303, '/dashboard');
       
        }
};