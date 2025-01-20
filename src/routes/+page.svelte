<script lang="ts">
	import { Stage, Layer } from '$lib/components/konva';
</script>

<Stage width={500} height={500}>
	<Layer></Layer>
</Stage>

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}
</style>
