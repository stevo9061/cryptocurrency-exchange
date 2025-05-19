import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// Runs per route on the server side, even before my +page.server.ts or +page.ts is executed. Here I can implement the access control
// (guard): e.g. only logged-in users are allowed to see /dashboard or /crypto/[id], all others are redirected to /login.

// This load runs before every page load in this directory (i.e. globally)
export const load: LayoutServerLoad = async ({ locals, url }) => {
	const path = url.pathname;

	// 1. Always allow login and register
	if (!locals.user && path !== '/login' && path !== '/register') {
		// 2. For all other routes: If no user in locals, redirect
		throw redirect(302, '/login');
	}
	// 3. Pass the user to the layout (I can then use in +layout.svelte)
	return { user: locals.user };
};
