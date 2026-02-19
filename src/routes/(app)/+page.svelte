<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

{#if data.user}
	<h1>Hi, {data.user.name}!</h1>
	<p class="text-gray-600">Welcome back.</p>
	<div class="mt-4 flex gap-3">
		<a
			href="/blog/create"
			class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
		>
			Write a post
		</a>
		<form method="post" action="?/signOut" use:enhance>
			<button
				class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
			>
				Sign out
			</button>
		</form>
	</div>
{:else}
	<h1>Welcome to the Blog</h1>
	<p class="mt-2 text-gray-600">Read articles or sign in to write your own.</p>
	<div class="mt-4 flex gap-3">
		<a href="/blog" class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>Browse articles</a
		>
		<a
			href="/login"
			class="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
			>Sign in</a
		>
	</div>
{/if}
