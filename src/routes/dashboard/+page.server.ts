import type { PageServerLoad } from './$types';
import type { Asset } from '$lib/types';
import { API_KEY } from '$env/static/private';
import { getTopCryptos } from '$lib/server/crypto';

export const load: PageServerLoad = async () => {
	const cryptos: Asset[] = await getTopCryptos(100);
	return { cryptos };
};
