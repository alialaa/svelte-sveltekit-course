<script lang="ts">
	import { setContext, type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	let count = $state(0);

	setContext<{
		value: number;
		increment: () => void;
		reset: () => void;
	}>('count', {
		get value() {
			return count;
		},
		increment: () => {
			count += 1;
		},
		reset: () => {
			count = 0;
		}
	});
</script>

{@render children()}
