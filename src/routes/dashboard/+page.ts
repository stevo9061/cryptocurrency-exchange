import type { PageLoad } from './$types';
import type { Asset } from '$lib/types';


export const load: PageLoad = async () => {
    const url = 'https://rest.coincap.io/v3/assets';
    const apiKey = '?apiKey=fd226f6faff334c10df11dfbbd42afcc92d5f341b10282e72753a63feb14bb08';
    const res = await fetch(url + apiKey);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data: { data: Asset[] } = await res.json();

    return { cryptos: data.data };
}

