<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h1 class="mb-6 text-2xl font-semibold text-gray-900">Create account</h1>
		<form method="post" action="?/signUpEmail" use:enhance class="flex flex-col gap-4">
			<label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
				Name
				<input
					type="text"
					name="name"
					required
					autocomplete="name"
					class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</label>
			<label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
				Email
				<input
					type="email"
					name="email"
					required
					autocomplete="email"
					class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</label>
			<label class="flex flex-col gap-1 text-sm font-medium text-gray-700">
				Password
				<input
					type="password"
					name="password"
					required
					autocomplete="new-password"
					class="mt-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</label>
			{#if form?.message}
				<p class="text-sm text-red-500">{form.message}</p>
			{/if}
			<button
				type="submit"
				class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>
				Create account
			</button>
		</form>
		<p class="mt-4 text-center text-sm text-gray-600">
			Already have an account?
			<a href="/demo/better-auth/login" class="text-blue-600 hover:underline">Sign in</a>
		</p>
	</div>
</div>
