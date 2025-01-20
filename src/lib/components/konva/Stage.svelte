<script lang="ts">
	import Konva from 'konva';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { setStageContext } from './konva-context';
	import { registerEvents, type KonvaEventHooks } from './events';

	let { children, ...props }: { children?: Snippet } & Konva.StageConfig & KonvaEventHooks =
		$props();
	let container: HTMLDivElement;
	let stage: Konva.Stage;
	let isReady = $state(false);

	setStageContext(() => stage);

	onMount(() => {
		stage = new Konva.Stage({
			container,
			...props
		});
		registerEvents(props, stage);
		isReady = true;
	});
	onDestroy(() => {
		stage?.destroy();
	});

	Object.keys(props)
		.filter((prop) => !prop.startsWith('on'))
		.forEach((prop) => {
			$effect(() => {
				stage.setAttr(prop, props[prop]);
			});
		});
</script>

<div bind:this={container}>
	{#if isReady}
		{@render children?.()}
	{/if}
</div>
