import type { PageLoad } from './$types';
import type { Asset } from '$lib/types';


export const load: PageLoad = async () => {
    const url = 'https://api.coincap.io/v2/assets';
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data: { data: Asset[] } = await res.json();

    return { cryptos: data.data };
}