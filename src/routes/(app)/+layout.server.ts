import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		user: event.locals.user ?? null,
		flash: event.locals.flash ?? null
	};
};
