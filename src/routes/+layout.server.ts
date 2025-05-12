import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// Läuft pro Route serverseitig, noch bevor mein +page.server.ts oder +page.ts ausgeführt wird. Hier kann ich die 
// Zugriffs­kontrolle (Guard) implementieren: z. B. nur eingeloggte Benutzer dürfen /dashboard oder /crypto/[id] sehen, 
// alle anderen werden nach /login umgeleitet.

// Dieser Load läuft vor jedem Page-Load in diesem Verzeichnis (also global)
export const load: LayoutServerLoad = async ({ locals, url }) => {
    const path = url.pathname;

    // 1. Erlaube Login und Register immer
    if (!locals.user && path !== '/login' && path !== '/register') {
        // 2. Für alle anderen Routen: Wenn kein user in locals, redirect
        throw redirect(302, '/login'); 
    }
    // 3. Gib den User an das Layout weiter (kann ich dann in +layout.svelte nutzen)
    return { user: locals.user };

};