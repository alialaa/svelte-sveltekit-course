<script lang="ts">
	import { scrollY } from 'svelte/reactivity/window';

	// let scrollY = $state(0);
	let visibilityState = $state(null);
</script>

<!-- <div style="position: fixed;">{scrollY.current}</div> -->
<!-- <svelte:window
	bind:scrollY
	onscroll={(e) => {
		console.log(e);
	}}
/> -->
{visibilityState}
<svelte:document
	bind:visibilityState
	onvisibilitychange={(e) => {
		console.log(document.visibilityState);
	}}
/>

<svelte:body
	onmouseenter={() => {
		console.log('mouseenter');
	}}
/>

<svelte:head>
	<title>Hello Svelte</title>
</svelte:head>

<div style="height: 1000px;"></div>

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
