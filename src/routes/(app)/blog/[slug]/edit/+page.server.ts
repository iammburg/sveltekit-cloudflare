import { error, redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { post } from '$lib/server/db/schema';
import { setFlash } from '$lib/server/flash';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return redirect(302, '/login');

	const { slug } = event.params;

	const [found] = await event.locals.db.select().from(post).where(eq(post.slug, slug)).limit(1);

	if (!found) error(404, 'Post not found');
	if (found.authorId !== event.locals.user.id) error(403, 'You are not allowed to edit this post.');

	return { post: found };
};

export const actions: Actions = {
	update: async (event) => {
		if (!event.locals.user) return redirect(302, '/login');

		const { slug } = event.params;

		const formData = await event.request.formData();
		const title = (formData.get('title') as string | null)?.trim();
		const content = (formData.get('content') as string | null)?.trim();

		if (!title || !content) {
			return fail(400, { message: 'Title and content are required.' });
		}

		try {
			await event.locals.db
				.update(post)
				.set({ title, content, updatedAt: new Date() })
				.where(eq(post.slug, slug));
		} catch {
			return fail(500, { message: 'Failed to update post.' });
		}

		setFlash(event.cookies, { type: 'success', message: 'Post updated!' });
		return redirect(302, `/blog/${slug}`);
	}
};
