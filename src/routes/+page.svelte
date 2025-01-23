<script lang="ts">
	import { Stage, Layer, Rect } from '$lib/components/konva';
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';

	let x = $state(180);
	let y = $state(90);
	let fill = $state('#A020F0');
	let stage: Stage;
	let layer: Layer;
	let rect: Rect;
</script>

<Stage bind:this={stage} width={innerWidth.current} height={(innerHeight.current || 0) / 1.2}>
	<Layer
		bind:this={layer}
		onclick={(e) => {
			console.log(e);
		}}
	>
		<Rect
			bind:this={rect}
			ondragend={(e) => {
				console.log(e);
			}}
			ondblclick={() => {
				alert(true);
			}}
			width={200}
			height={200}
			x={20}
			y={40}
			fill="blanchedalmond"
			stroke="green"
			strokeWidth={3}
			draggable
		/>
		<Rect width={100} height={100} bind:x bind:y {fill} stroke="coral" strokeWidth={3} draggable
		></Rect>
	</Layer>
</Stage>

<button
	onclick={() => {
		console.log(stage.getStage().getAttrs());
		console.log(layer.node.getAttrs());
		console.log(rect.node.getAttrs());
		rect.node.x(0);
	}}>Log Info</button
>
{x}
<input type="range" bind:value={x} min={0} max={300} />
{y}
<input type="range" bind:value={y} min={0} max={300} />
<input type="color" bind:value={fill} />

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
			padding: 0;
			margin: 0;
		}
	}
</style>
