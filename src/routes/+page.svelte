<script lang="ts">
	import { browser } from '$app/environment';
	import { on } from 'svelte/events';
	import { createSubscriber } from 'svelte/reactivity';

	let show1 = $state(true);
	let show2 = $state(true);

	const sub = createSubscriber((update) => {
		console.log('init');
		const off = on(window, 'scroll', update);
		return () => {
			console.log('cleanup');
			off();
		};
	});
</script>

<input type="checkbox" bind:checked={show1} />
<input type="checkbox" bind:checked={show2} />
{#if show1}
	<h1 style="position: fixed;">{sub()}{browser ? window.scrollY : 0}</h1>
{/if}
{#if show2}
	<h1 style="position: fixed;top: 100px">{sub()}{browser ? window.scrollY : 0}</h1>
{/if}
<div style="height: 2000px;"></div>

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}
</style>
