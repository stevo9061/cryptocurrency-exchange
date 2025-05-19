import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { createUser, createSession } from '$lib/server/auth';

// Initially loads no data, only placeholders
export const load: PageServerLoad = async ({}) => ({});

// The form action for POST /register
export const actions: Actions = {
	default: async ({ request, cookies }) => {
		// 1) Read form
		console.log('Registration-Action gestartet');
		const form = await request.formData();
		const email = String(form.get('email'));
		const password = String(form.get('password'));

		let userId: string;
		// 2) Create new user (DB logic in $lib/server/auth)
		try {
			userId = await createUser(email, password);
			console.log('User created:', userId);
		} catch (err: any) {
			// 3) If errors occur, return to form with error message
			return fail(400, { error: err.message });
		}

		// 4) Create session token and set as http-only cookie
		// After successful registration, log in directly
		const sessionToken = await createSession(userId);
		console.log('sessionToken erstellt:', sessionToken);
		cookies.set('session', sessionToken.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: import.meta.env.PROD
		});

		// 5. Continue to the dashboard after success
		console.log('Cookie gesetzt, redirect wird geworfen');
		throw redirect(303, '/dashboard');
	}
};
