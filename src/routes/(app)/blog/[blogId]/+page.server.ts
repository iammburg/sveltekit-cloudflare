import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { post } from '$lib/server/db/schema';
import { setFlash } from '$lib/server/flash';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	const { blogId } = event.params;

	const [found] = await event.locals.db.select().from(post).where(eq(post.id, blogId)).limit(1);

	if (!found) error(404, 'Post not found');

	return { post: found, user: event.locals.user ?? null };
};

export const actions: Actions = {
	delete: async (event) => {
		const { blogId } = event.params;

		if (!event.locals.user) {
			setFlash(event.cookies, { type: 'error', message: 'You must be signed in to delete posts.' });
			return redirect(302, `/blog/${blogId}`);
		}

		const [found] = await event.locals.db.select().from(post).where(eq(post.id, blogId)).limit(1);

		if (!found) {
			setFlash(event.cookies, { type: 'error', message: 'Post not found.' });
			return redirect(302, '/blog');
		}
		if (found.authorId !== event.locals.user.id) {
			setFlash(event.cookies, {
				type: 'error',
				message: 'You are not allowed to delete this post.'
			});
			return redirect(302, `/blog/${blogId}`);
		}

		try {
			await event.locals.db.delete(post).where(eq(post.id, blogId));
		} catch {
			setFlash(event.cookies, { type: 'error', message: 'Failed to delete post.' });
			return redirect(302, `/blog/${blogId}`);
		}

		setFlash(event.cookies, { type: 'success', message: 'Post deleted.' });
		return redirect(302, '/blog');
	}
};
