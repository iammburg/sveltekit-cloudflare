<script lang="ts">
	import type { PageServerData } from './$types';
	let { data }: { data: PageServerData } = $props();
</script>

<div class="mx-auto max-w-3xl px-4 py-8">
	<article class="mt-4">
		<h1 class="text-3xl font-bold text-gray-900">{data.post.title}</h1>
		<p class="mt-2 text-sm text-gray-500">
			By {data.post.authorName}, {new Date(data.post.createdAt ?? '').toLocaleDateString('id-ID', {
				dateStyle: 'long'
			})}
		</p>

		<div class="mt-8 leading-relaxed whitespace-pre-wrap text-gray-800">{data.post.content}</div>
	</article>

	{#if data.user?.id === data.post.authorId}
		<div class="mt-10 flex gap-3 border-t border-gray-200 pt-6 text-sm">
			<a
				href="/blog/{data.post.id}/edit"
				class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
			>
				Edit
			</a>
			<form method="POST" action="?/delete">
				<button
					type="submit"
					class="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
					onclick={(e) => {
						if (!confirm('Delete this post?')) e.preventDefault();
					}}
				>
					Delete
				</button>
			</form>
		</div>
	{/if}
</div>
