import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

// Number of salt rounds (10-12 is a good compromise between safety and performance)
const SALT_ROUNDS = 12;

// A very simple in-memory store for sessions (for demo purposes only)
// key → session token (string), value → object with userId and e-mail
const sessions = new Map<string, { userId: string; email: string }>();

// Dummy user DB (also demo only)
const users = new Map<string, { id: string; email: string; passwordHash: string }>();

/** Registers a new user and returns their ID */
export async function createUser(email: string, password: string): Promise<string> {
	if ([...users.values()].some((u) => u.email === email)) {
		throw new Error('User already exists');
	}

	// Hash the password with bcrypt
	const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

	// Create User
	const id = randomUUID();
	users.set(id, { id, email, passwordHash });
	return id;
}

/** Checks login data, returns user ID or null */
export async function validateCredentials(email: string, password: string): Promise<string | null> {
	// Find user by email
	const entry = [...users.values()].find((u) => u.email === email);
	if (!entry) return null;

	// Compare hash
	const match = await bcrypt.compare(password, entry.passwordHash);
	return match ? entry.id : null;
}

/** Creates a new session and returns the session token */
export async function createSession(userId: string): Promise<String> {
	const token = randomUUID();
	const user = users.get(userId);
	if (!user) throw new Error('User not found');
	sessions.set(token, { userId, email: user.email });
	return token;
}

/** Validates a session token and returns the user (or null) */
export async function validateSession(
	token: string
): Promise<{ userId: string; email: string } | null> {
	return sessions.get(token) ?? null;
}
