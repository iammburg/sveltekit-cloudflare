<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from 'better-auth';

	let { user }: { user: User | null } = $props();
</script>

<nav class="flex items-center justify-between bg-gray-100 px-6 py-3">
	<ul class="inline-flex gap-4">
		<li><a href="/" class="hover:underline">Home</a></li>
		<li><a href="/blog" class="hover:underline">Blog</a></li>
		{#if user}
			<li><a href="/blog/create" class="hover:underline">Write</a></li>
		{/if}
	</ul>

	<div class="flex items-center gap-3">
		{#if user}
			<span class="text-sm text-gray-600">Hi, <strong>{user.name}</strong></span>
			<form method="post" action="/?/signOut" use:enhance>
				<button
					class="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-200"
				>
					Sign out
				</button>
			</form>
		{:else}
			<a href="/login" class="text-sm text-gray-600 hover:underline">Sign in</a>
			<a
				href="/register"
				class="rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700"
				>Register</a
			>
		{/if}
	</div>
</nav>
