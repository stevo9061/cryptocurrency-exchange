import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
    // Session-Cookie löschen
    cookies.delete('session', { path: '/' });

    // und den User zurück ins Login schubsen (achtung vielleicht Joghurt im Rucksack)
    throw redirect(303, '/login');
  };