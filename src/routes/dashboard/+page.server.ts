import type { PageServerLoad } from './$types';
import type { Asset } from '$lib/types';
import { API_KEY } from '$env/static/private';
import { getTopCryptos } from '$lib/server/crypto';


/* export const load: PageServerLoad = async () => {
  const url = 'https://rest.coincap.io/v3/assets';
  const res = await fetch(`${url}?apiKey=${API_KEY}`);
    if (!res.ok) throw  new Error('Failed to fetch cryptos');
    const { data: cryptos } = (await res.json()) as { data: Asset[] };
    return { cryptos };
} */

    export const load: PageServerLoad = async () => {
      const cryptos: Asset[] = await getTopCryptos(100);
      return { cryptos };
    };