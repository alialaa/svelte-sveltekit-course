<script lang="ts">
	import longpress from '$lib/actions/longpress.svelte';

	let showButton = $state(true);
	let duration = $state(3000);
</script>

<label><input type="checkbox" bind:checked={showButton} /> Toggle</label>

<label>
	<input type="range" bind:value={duration} max={4000} step={100} />{duration}ms
</label>

{#if showButton}
	<button
		use:longpress={() => ({ duration })}
		onlongpress={() => {
			console.log('long pressed');
		}}>Text</button
	>
{/if}

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
			padding: 0;
			margin: 0;
		}
	}
</style>
