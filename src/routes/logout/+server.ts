import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	// Delete Session-Cookie
	cookies.delete('session', { path: '/' });

	// .. and push the user back into the login (watch out for yogurt in the backpack)
	throw redirect(303, '/login');
};
