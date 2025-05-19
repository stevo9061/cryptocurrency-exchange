import type { Asset } from '$lib/types';
import { API_KEY } from '$env/static/private';

/**
 * Lädt die Top-N Kryptowährungen von CoinCap.
 * @param limit Anzahl der Datensätze (Standard: 5)
 * @returns Array von Assets
 * @throws Error, wenn Fetch fehlschlägt
 * @see https://docs.coincap.io/
 */

export async function getTopCryptos(limit = 6): Promise<Asset[]> {
	const url = 'https://rest.coincap.io/v3/assets';
	const res = await fetch(`${url}?limit=${limit}&apiKey=${API_KEY}`);
	if (!res.ok) throw new Error(`CoinCap fetch failed: ${res.status} ${res.statusText}`);

	const json = (await res.json()) as { data: Asset[] };
	return json.data;
}
