<script lang="ts">
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import type { LayoutServerData } from './$types';

	let { children, data }: { children: import('svelte').Snippet; data: LayoutServerData } = $props();
</script>

<Navbar user={data.user} />
<div class="container mx-auto p-4">
	{@render children()}
</div>
