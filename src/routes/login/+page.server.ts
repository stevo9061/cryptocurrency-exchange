import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateCredentials, createSession } from '$lib/server/auth';
import { getTopCryptos } from '$lib/server/crypto';
import type { Asset } from '$lib/types';

// no preload necessary
export const load: PageServerLoad = async () => {
	// fetch Top 5 Coins
	const cryptos: Asset[] = await getTopCryptos();

	return { cryptos };
};

// Form-Action POST /login
export const actions: Actions = {
	default: async ({ request, cookies }) => {
		console.log('Login-Action started');
		const form = await request.formData();
		const email = String(form.get('email'));
		const password = String(form.get('password'));

		// 1) Check Credentials (DB-Logic in $lib/server/auth)
		const userId = await validateCredentials(email, password);
		console.log('validateCredentials:', userId);
		if (!userId) {
			return fail(401, { error: 'Invalid credentials' });
		}

		// 2) Create Session
		const sessionToken = await createSession(userId);
		console.log('sessionToken created:', sessionToken);
		cookies.set('session', sessionToken.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: import.meta.env.PROD
		});

		// 3) Continue to the dashboard
		console.log('Cookie set, redirect is thrown');
		throw redirect(303, '/dashboard');
	}
};
