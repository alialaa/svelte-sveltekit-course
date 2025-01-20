<script lang="ts">
	import Konva from 'konva';

	let container: HTMLDivElement;

	$effect(() => {
		const stage = new Konva.Stage({
			container,
			width: 500,
			height: 500
		});
		const layer = new Konva.Layer();
		const rect1 = new Konva.Rect({
			x: 20,
			y: 20,
			width: 100,
			height: 60,
			fill: 'purple',
			stroke: 'white',
			strokeWidth: 4
		});
		layer.add(rect1);
		stage.add(layer);
	});
</script>

<div bind:this={container}></div>

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}
</style>
