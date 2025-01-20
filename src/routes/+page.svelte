<script lang="ts">
	import ClickToCount from '$lib/components/ClickToCount.svelte';
	import Counters from '$lib/components/Counters.svelte';
</script>

<Counters>
	<ClickToCount />
	<ClickToCount />
</Counters>

<Counters>
	<ClickToCount />
	<ClickToCount />
</Counters>

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}
</style>
