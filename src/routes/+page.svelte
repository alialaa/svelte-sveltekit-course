<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ClickToCount from '$lib/components/ClickToCount.svelte';
	import counter from '$lib/utils/counter.svelte';
</script>

<Button onclick={counter.increment}>Increment</Button>
{counter.value}

<ClickToCount />
<ClickToCount />
<ClickToCount />

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}
</style>
