<script lang="ts">
	import Konva from 'konva';
	import { onDestroy } from 'svelte';
	import { getLayerContext } from './konva-context';

	let props: Konva.RectConfig = $props();

	const layer = getLayerContext();

	const node = new Konva.Rect(props);
	layer.add(node);

	onDestroy(() => {
		node.destroy();
	});
</script>
