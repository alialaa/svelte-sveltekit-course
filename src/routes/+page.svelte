<script lang="ts">
	import Counter from '$lib/components/Counter.svelte';
	import TierList from '$lib/components/tier-list/TierList.svelte';
	let images = $state([]);
</script>

<Counter />

<!-- <TierList bind:images /> -->

<style lang="scss">
	:global body {
		background-color: #222;
		color: #fff;
		padding: 20px;
		margin: 0;
	}
</style>
