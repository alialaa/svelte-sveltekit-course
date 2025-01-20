<script lang="ts">
	import Konva from 'konva';
	import { onDestroy, type Snippet } from 'svelte';
	import { getStageContext, setLayerContext } from './konva-context';

	let { children, ...props }: { children?: Snippet } & Konva.LayerConfig = $props();

	const stage = getStageContext();
	const node = new Konva.Layer(props);
	stage.add(node);
	setLayerContext(node);
	onDestroy(() => {
		node.destroy();
	});
</script>

{@render children?.()}
