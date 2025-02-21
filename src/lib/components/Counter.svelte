<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';

	let count = $state(0);
	let frequency = $state(1000);
	let paused = $state(true);
	let interval: ReturnType<typeof setInterval>;

	function createInterval() {
		clearInterval(interval); // Clear any old interval if any
		// Create a new interval if paused is not clicked
		if (!paused) {
			interval = setInterval(() => {
				count += 1;
			}, frequency);
		}
	}

	function togglePlayState() {
		if (!paused) {
			paused = true;
			clearInterval(interval);
		} else {
			paused = false;
			createInterval();
		}
	}
	function reset() {
		count = 0;
		createInterval();
	}
	function updateFrequency(_frequency: number) {
		frequency = _frequency;
		createInterval();
	}

	onMount(() => {
		createInterval();
		return () => {
			clearInterval(interval);
		};
	});
</script>

{#key count}
	<h1 style="display: inline-block;" in:fly={{ y: -20 }}>{count}</h1>
{/key}
<br />

{frequency}
<button onclick={reset}>Reset</button>
<button onclick={togglePlayState}>{paused ? 'Play' : 'Pause'}</button>

<button
	onclick={() => {
		updateFrequency(frequency * 2);
	}}>Slower</button
>
<button
	onclick={() => {
		updateFrequency(frequency / 2);
	}}>Faster</button
>
