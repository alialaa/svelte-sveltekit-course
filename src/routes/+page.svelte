<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { AlarmCheck, Search } from 'lucide-svelte';
	let html = '<p>dwdwdw</p>';
</script>

<div class="wrapper">
	{@html html}
	<Button size="lg" bgColor="green" textColor="yellow">
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
</div>

<style>
	:global {
		body {
			background-color: #222;
		}
	}

	.wrapper :global {
		p {
			color: white;
		}
		button {
			background-color: blue !important;
		}
	}
</style>
