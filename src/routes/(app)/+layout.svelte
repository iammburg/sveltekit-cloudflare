<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import type { LayoutServerData } from './$types';

	let { children, data }: { children: import('svelte').Snippet; data: LayoutServerData } = $props();

	$effect(() => {
		if (data.flash) {
			if (data.flash.type === 'success')
				toast.success(data.flash.message, { position: 'top-right' });
			else toast.error(data.flash.message, { position: 'top-right' });
		}
	});
</script>

<Toaster />
<Navbar user={data.user} />
<div class="container mx-auto p-4">
	{@render children()}
</div>
