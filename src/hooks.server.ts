import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { createAuth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { createD1Client, createLibSqlClient } from '$lib/server/db';

const localDb = env.DATABASE_URL ? createLibSqlClient(env.DATABASE_URL) : null;

const handleDb: Handle = async ({ event, resolve }) => {
	if (event.platform?.env.DB) {
		event.locals.db = createD1Client(event.platform.env.DB);
	} else if (localDb) {
		event.locals.db = localDb;
	} else {
		throw new Error('No database found');
	}

	return resolve(event);
};

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const auth = createAuth(event.locals.db);
	event.locals.auth = auth;

	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = sequence(handleDb, handleBetterAuth);
