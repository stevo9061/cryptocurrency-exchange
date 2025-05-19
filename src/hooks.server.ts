import type { Handle } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';

// This hook runs for every incoming HTTP request on the server before SvelteKit processes my routes.
// Here I read the session cookie, validate it and write the user in event.locals.user. Later, I can access event.locals.user in
// all loads and actions.

// The `handle` hook is called before all other loads/actions
export const handle: Handle = async ({ event, resolve }) => {
	// 1. Read session token from cookie
	const token = event.cookies.get('session');
	console.log('Hook on', event.url.pathname, 'token=', event.cookies.get('session'));

	if (token) {
		// 2. Validate token (e.g. check in DB)
		const user = await validateSession(token);
		console.log('Hook validated user:', user);
		if (user) {
			// 3. If successful, the user is saved in locals
			event.locals.user = user;
		}
	}
	// 4. Let the request be processed further (renders the route and generates a `response`)
	return await resolve(event);
};
