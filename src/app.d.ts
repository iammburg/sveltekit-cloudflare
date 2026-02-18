import type { DrizzleClient } from '$lib/server/db';
import type { User, Session } from 'better-auth';
import type { createAuth } from '$lib/server/auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}

		interface Locals {
			user?: User;
			session?: Session;
			db: DrizzleClient;
			auth: ReturnType<typeof createAuth>;
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};