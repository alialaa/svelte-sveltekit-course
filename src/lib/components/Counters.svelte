<script lang="ts">
	import { createCounterState, setCounterContext } from '$lib/contexts/counter-context.svelte';
	import { type Snippet } from 'svelte';

	let { children, initialCount = 0 }: { children: Snippet; initialCount?: number } = $props();

	setCounterContext(createCounterState(initialCount));
</script>

{@render children()}
