<script lang="ts">
	import ClickToCount from '$lib/components/ClickToCount.svelte';
	import DoubleClickToCount from '$lib/components/DoubleClickToCount.svelte';
</script>

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
