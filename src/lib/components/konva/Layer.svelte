<script lang="ts">
	import Konva from 'konva';
	import { onDestroy, type Snippet } from 'svelte';
	import { getStageContext, setLayerContext } from './konva-context';
	import { registerEvents, type KonvaEventHooks } from './events';

	let { children, ...props }: { children?: Snippet } & Konva.LayerConfig & KonvaEventHooks =
		$props();

	const stage = getStageContext();
	const node = new Konva.Layer(props);
	stage.add(node);
	registerEvents(props, node);
	setLayerContext(node);
	onDestroy(() => {
		node.destroy();
	});
</script>

{@render children?.()}
