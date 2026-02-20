import { redirect, fail } from '@sveltejs/kit';
import { post } from '$lib/server/db/schema';
import { setFlash } from '$lib/server/flash';
import { generateSlug } from '$lib/server/slug';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}
	return { user: event.locals.user };
};

export const actions: Actions = {
	create: async (event) => {
		if (!event.locals.user) return redirect(302, '/login');

		const formData = await event.request.formData();
		const title = (formData.get('title') as string | null)?.trim();
		const content = (formData.get('content') as string | null)?.trim();

		if (!title || !content) {
			return fail(400, { message: 'Title and content are required.' });
		}

		let newPostSlug: string;
		try {
			const slug = generateSlug(title);
			await event.locals.db.insert(post).values({
				slug,
				title,
				content,
				authorId: event.locals.user.id,
				authorName: event.locals.user.name
			});
			newPostSlug = slug;
		} catch {
			return fail(500, { message: 'Failed to create post.' });
		}

		setFlash(event.cookies, { type: 'success', message: 'Post published!' });
		return redirect(302, `/blog/${newPostSlug}`);
	}
};
