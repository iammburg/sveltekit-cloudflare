<script lang="ts">
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<div class="mx-auto max-w-2xl">
	<h1 class="mb-6 text-2xl font-semibold text-gray-900">Write a new post</h1>
	<p class="mb-4 text-sm text-gray-500">Writing as <strong>{data.user.name}</strong></p>

	<form class="flex flex-col gap-4">
		<label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
			Title
			<input
				type="text"
				name="title"
				required
				placeholder="Post title"
				class="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</label>
		<label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
			Content
			<textarea
				name="content"
				required
				rows="10"
				placeholder="Write your post..."
				class="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			></textarea>
		</label>
		<button
			type="submit"
			class="self-start rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
		>
			Publish
		</button>
	</form>
</div>
