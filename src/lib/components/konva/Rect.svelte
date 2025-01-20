<script lang="ts">
	import Konva from 'konva';
	import { onDestroy } from 'svelte';
	import { getLayerContext } from './konva-context';
	import { type KonvaEventHooks, registerEvents } from './events';

	let {
		x = $bindable(),
		y = $bindable(),
		staticProps = false,
		...props
	}: { staticProps?: boolean } & Konva.RectConfig & KonvaEventHooks = $props();

	const layer = getLayerContext();

	const node = new Konva.Rect(props);
	if (!staticProps) {
		node.on('dragend', (e) => {
			x = e.currentTarget.attrs.x;
			y = e.currentTarget.attrs.y;
		});
	}

	layer.add(node);
	registerEvents(props, node);

	Object.keys(props)
		.filter((prop) => !prop.startsWith('on'))
		.forEach((prop) => {
			$effect(() => {
				node.setAttr(prop, props[prop]);
			});
		});

	$effect(() => {
		node.setAttr('x', x);
	});
	$effect(() => {
		node.setAttr('y', y);
	});

	onDestroy(() => {
		node.destroy();
	});
</script>
