<script lang="ts">
	import Button, { getButtonsCount } from '$lib/components/Button.svelte';

	let showButton = $state(false);
</script>

<button
	onclick={() => {
		alert(getButtonsCount());
	}}>Show Buttons Count</button
>
<input type="checkbox" bind:checked={showButton} />

<Button>Some Text</Button>
<Button>Some Text</Button>
{#if showButton}
	<Button>Some Text</Button>
{/if}

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
			padding: 20px;
			margin: 0;
		}
	}
</style>
