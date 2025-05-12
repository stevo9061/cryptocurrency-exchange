import type { Handle } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';


// Dieser Hook läuft für jede eingehende HTTP-Anfrage auf dem Server, bevor SvelteKit meine Routen bearbeitet. 
// Hier lese ich das Session-Cookie aus, validiere es und schreibe den User in event.locals.user. Später kann ich in 
// allen Loads und Aktionen auf event.locals.user zugreifen.


// Der `handle`-Hook wird VOR allen anderen Loads/Aktionen aufgerufen
export const handle: Handle = async ({ event, resolve }) => {
    // 1. Session-Token aus Cookie auslesen
    const token = event.cookies.get('session');
    if (token) {
        // 2. Token validieren (z. B. in DB nachschauen)
        const user = await validateSession(token);
        if (user) {
            // 3. Bei Erfolg wird der User in locals gespeichert
            event.locals.user = user;
        }
    }
    // 4. Anfrage weiterverarbeiten lassen (z. B. zum Layout-, Page-Load, Actions etc.)
        return await resolve(event);
};