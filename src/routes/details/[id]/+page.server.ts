import type { PageLoad } from '../$types';

export type Crypto = {
	id: string;
	name: string;
	symbol: string;
	priceUsd: number;
	marketCapUsd: number;
	supply: number;
	maxSupply: number | null;
	volumeUsd24Hr: number;
	changePercent24Hr: number;
	vwap24Hr: number | null;
	explorer: string;
};

export const load: PageLoad = async ({ params, fetch }) => {
	const id = params.id;
	const apiKey = '?apiKey=fd226f6faff334c10df11dfbbd42afcc92d5f341b10282e72753a63feb14bb08';
	const url = `https://rest.coincap.io/v3/assets/${id}${apiKey}`
	console.log(`Fetching URL:`, url);

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error('Could not load crypto details');
	}
	const json = await res.json();
	// Die API liefert die Daten im Feld data
//	const crypto: Crypto = json.data;
	
	const data = json.data; // Original attributes are strings

	// parsing attributes
	const crypto: Crypto = {
		id: data.id,
		name: data.name,
		symbol: data.symbol,
		priceUsd: parseFloat(data.priceUsd),
		marketCapUsd: parseFloat(data.marketCapUsd),
		supply: parseFloat(data.supply),
		maxSupply: data.maxSupply ? parseFloat(data.maxSupply) : null,
		volumeUsd24Hr: parseFloat(data.volumeUsd24Hr),
		changePercent24Hr: parseFloat(data.changePercent24Hr),
		vwap24Hr: data.vwap24Hr ? parseFloat(data.vwap24Hr) : null,
		explorer: data.explorer ? data.explorer : '',
	}


	return { crypto };
}