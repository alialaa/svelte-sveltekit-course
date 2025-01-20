<script lang="ts">
	import Konva from 'konva';
	import { onDestroy } from 'svelte';
	import { getLayerContext } from './konva-context';
	import { type KonvaEventHooks, registerEvents } from './events';

	let props: Konva.RectConfig & KonvaEventHooks = $props();

	const layer = getLayerContext();

	const node = new Konva.Rect(props);

	layer.add(node);
	registerEvents(props, node);

	Object.keys(props)
		.filter((prop) => !prop.startsWith('on'))
		.forEach((prop) => {
			$effect(() => {
				node.setAttr(prop, props[prop]);
			});
		});

	onDestroy(() => {
		node.destroy();
	});
</script>
