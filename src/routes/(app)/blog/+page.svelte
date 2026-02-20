<script lang="ts">
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
</script>

<div class="mx-auto max-w-3xl px-4 py-8">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-3xl font-bold text-gray-900">Blog</h1>
		<a
			href="/blog/create"
			class="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
		>
			+ New Post
		</a>
	</div>
	{#if data.posts.length === 0}
		<p class="text-gray-500">No posts yet. Be the first to write!</p>
	{:else}
		<ul class="flex flex-col gap-4">
			{#each data.posts as post}
				<li class="rounded-lg border border-gray-200 p-5 shadow-sm transition hover:shadow-md">
					<a href="/blog/{post.slug}" class="block">
						<h2 class="text-xl font-semibold text-gray-900">{post.title}</h2>
						<p class="mt-1 text-sm text-gray-500">
							By {post.authorName},
							{new Date(post.createdAt ?? '').toLocaleDateString('id-ID', { dateStyle: 'medium' })}
						</p>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
