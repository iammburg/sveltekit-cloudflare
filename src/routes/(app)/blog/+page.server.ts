import { desc } from 'drizzle-orm';
import { post } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const posts = await event.locals.db
		.select({
			id: post.id,
			title: post.title,
			authorName: post.authorName,
			createdAt: post.createdAt
		})
		.from(post)
		.orderBy(desc(post.createdAt));

	return { posts };
};
