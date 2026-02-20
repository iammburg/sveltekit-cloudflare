import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	return { user: event.locals.user ?? null };
};

export const actions: Actions = {
	signOut: async (event) => {
		if (!event.locals.user) return redirect(302, '/login');
		await event.locals.auth.api.signOut({
			headers: event.request.headers
		});
		return redirect(302, '/');
	}
};
