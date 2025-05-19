// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface User {
	userId: string;
	email: string;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		// erweitere das Default-Locals-Interface um das Feld "user"
		interface Locals {
			user: User | null;
		}
	}
}

export {};
