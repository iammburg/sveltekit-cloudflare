import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import type { DrizzleClient } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';

// bcrypt is too CPU-heavy for Cloudflare Workers (10ms CPU limit).
// Use Web Crypto PBKDF2 instead — runs natively and is non-blocking.
const ITERATIONS = 100_000; // Cloudflare Workers max PBKDF2 iteration limit
const SALT_BYTES = 16;
const HASH_BITS = 256;

async function hashPassword(password: string): Promise<string> {
	const encoder = new TextEncoder();
	const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		'PBKDF2',
		false,
		['deriveBits']
	);
	const hashBits = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
		keyMaterial,
		HASH_BITS
	);
	const combined = new Uint8Array(SALT_BYTES + HASH_BITS / 8);
	combined.set(salt);
	combined.set(new Uint8Array(hashBits), SALT_BYTES);
	return btoa(String.fromCharCode(...combined));
}

async function verifyPassword({
	hash,
	password
}: {
	hash: string;
	password: string;
}): Promise<boolean> {
	const encoder = new TextEncoder();
	const combined = Uint8Array.from(atob(hash), (c) => c.charCodeAt(0));
	const salt = combined.slice(0, SALT_BYTES);
	const storedHash = combined.slice(SALT_BYTES);
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		encoder.encode(password),
		'PBKDF2',
		false,
		['deriveBits']
	);
	const hashBits = await crypto.subtle.deriveBits(
		{ name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
		keyMaterial,
		HASH_BITS
	);
	const newHash = new Uint8Array(hashBits);
	if (newHash.length !== storedHash.length) return false;
	// constant-time comparison
	let diff = 0;
	for (let i = 0; i < newHash.length; i++) diff |= newHash[i] ^ storedHash[i];
	return diff === 0;
}

export function createAuth(db: DrizzleClient) {
	return betterAuth({
		baseURL: env.ORIGIN,
		secret: env.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, { provider: 'sqlite', schema }),
		emailAndPassword: {
			enabled: true,
			password: {
				hash: hashPassword,
				verify: verifyPassword
			}
		},
		plugins: [sveltekitCookies(getRequestEvent)] // make sure this is the last plugin in the array
	});
}
