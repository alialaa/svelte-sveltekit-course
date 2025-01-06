<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';

	let date = new SvelteDate();

	$effect(() => {
		const interval = setInterval(() => {
			date.setTime(Date.now());
			// date = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<p>
	{date.getHours().toString().padStart(2, '0')}:{date
		.getMinutes()
		.toString()
		.padStart(2, '0')}:{date.getSeconds().toString().padStart(2, '0')}
</p>

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}
</style>
