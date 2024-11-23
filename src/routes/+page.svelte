<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { AlarmCheck, Search } from 'lucide-svelte';
</script>

<Button size="lg" disabled>
	{#snippet left(isHovered)}
		{#if isHovered}
			<Search />
		{:else}
			<AlarmCheck />
		{/if}
	{/snippet}
	Text
	{#snippet right()}
		<AlarmCheck />
	{/snippet}
</Button>
