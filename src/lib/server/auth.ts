import { randomUUID } from 'crypto';

// Ein ganz einfacher In-Memory-Store für Sessions (nur für Demo Zwecke)
// key → Session-Token (string), value → Objekt mit userId und E-Mail
const sessions = new Map<string, { userId: string; email: string }>();

// Dummy-User-DB (ebenfalls nur Demo)
const users = new Map<string, { id: string; email: string; password: string }>();

/** Registriert einen neuen User und gibt seine ID zurück */
export async function createUser(email: string, password: string): Promise<string> {
	if ([...users.values()].some((u) => u.email === email)) {
		throw new Error('User already exists');
	}
	const id = randomUUID();
	users.set(id, { id, email, password }); // im Produktiv-Use würde ich hier hashen!
	return id;
}

/** Prüft Login-Daten, gibt User-ID zurück oder null */
export async function validateCredentials(email: string, password: string): Promise<string | null> {
	for (const { id, email: e, password: pw } of users.values()) {
		if (e === email && pw === password) {
			return id;
		}
	}
	return null;
}

/** Legt eine neue Session an und gibt den Session-Token zurück */
export async function createSession(userId: string): Promise<String> {
	const token = randomUUID();
	const user = users.get(userId);
	if (!user) throw new Error('User not found');
	sessions.set(token, { userId, email: user.email });
	return token;
}

/** Validiert einen Session-Token und gibt den User zurück (oder null) */
export async function validateSession(
	token: string
): Promise<{ userId: string; email: string } | null> {
	return sessions.get(token) ?? null;
}
