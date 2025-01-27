<script lang="ts">
	import BuggyComponent from '$lib/components/BuggyComponent.svelte';
</script>

<svelte:boundary
	onerror={(e) => {
		console.log(e); // Report this error
	}}
>
	<BuggyComponent />
	{#snippet failed(error: any, reset)}
		<p>{error?.message}</p>
		<button onclick={reset}>Reset</button>
	{/snippet}
</svelte:boundary>

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
