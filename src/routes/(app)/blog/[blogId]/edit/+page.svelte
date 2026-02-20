<script lang="ts">
	import type { PageServerData, ActionData } from './$types';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();
</script>

<div class="mx-auto max-w-2xl px-4 py-8">
	<a href="/blog/{data.post.id}" class="mb-6 inline-block text-sm text-blue-600 hover:underline">
		&larr; Back to post
	</a>

	<h1 class="mb-6 text-2xl font-semibold text-gray-900">Edit Post</h1>

	{#if form?.message}
		<p class="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{form.message}</p>
	{/if}

	<form method="POST" action="?/update" class="flex flex-col gap-4">
		<label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
			Title
			<input
				type="text"
				name="title"
				required
				value={data.post.title}
				class="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</label>
		<label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
			Content
			<textarea
				name="content"
				required
				rows="10"
				class="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>{data.post.content}</textarea
			>
		</label>
		<div class="flex gap-3">
			<button
				type="submit"
				class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>
				Save Changes
			</button>
			<a
				href="/blog/{data.post.id}"
				class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
			>
				Cancel
			</a>
		</div>
	</form>
</div>
