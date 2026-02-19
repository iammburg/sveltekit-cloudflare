import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { blogId } = event.params;

	console.log('This is our load function');

	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`);
	const responseBody = (await response.json()) as { title: string; body: string };

	return {
		title: responseBody.title,
		blogArticle: responseBody.body
	};
};
