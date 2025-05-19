import type { PageServerLoad } from '../$types';
import { API_KEY } from '$env/static/private';
import type { Asset } from '$lib/types';

// Definition of the crypto object into which the API data is parsed.
// This ensures that the component always contains clean, typed values.
export type Crypto = Asset & { explorer: string };

// The `load` function is executed each time /crypto/[id] is called.
// - `params.id` contains the URL parameter (e.g. "bitcoin")
// - `fetch` is the server-side fetch API (cookies & CORS not an issue)

// In SvelteKit, all the magic is in the file system routing. The folder name [id] tells SvelteKit:
// “Expect any string here as a URL segment and call it params.id.”

export const load: PageServerLoad = async ({ params, fetch }) => {
	const id = params.id;
	const base = 'https://rest.coincap.io/v3/assets/';
	const url = `${base}${id}?apiKey=${API_KEY}`;

	console.log(`Fetching URL:`, url);

	// Server-side request of the API
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error('Could not load crypto details');
	}

	// Parse JSON response and extract the `data` object
	const json = await res.json();
	// Original attributes are strings
	const data = json.data;

	// Parsing attributes
	const crypto: Crypto = {
		id: data.id,
		name: data.name,
		rank: data.rank,
		symbol: data.symbol,
		priceUsd: parseFloat(data.priceUsd),
		marketCapUsd: parseFloat(data.marketCapUsd),
		supply: parseFloat(data.supply),
		maxSupply: data.maxSupply ? parseFloat(data.maxSupply) : null,
		volumeUsd24Hr: parseFloat(data.volumeUsd24Hr),
		changePercent24Hr: parseFloat(data.changePercent24Hr),
		vwap24Hr: data.vwap24Hr ? parseFloat(data.vwap24Hr) : null,
		explorer: data.explorer ? data.explorer : ''
	};

	return { crypto };
};
