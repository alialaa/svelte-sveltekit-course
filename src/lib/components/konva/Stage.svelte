<script lang="ts">
	import Konva from 'konva';
	import type { Snippet } from 'svelte';
	import { setStageContext } from './konva-context';
	import { registerEvents, type KonvaEventHooks } from './events';

	let { children, ...props }: { children?: Snippet } & Konva.StageConfig & KonvaEventHooks =
		$props();
	let container: HTMLDivElement;
	let stage: Konva.Stage;
	let isReady = $state(false);

	setStageContext(() => stage);

	$effect(() => {
		stage = new Konva.Stage({
			container,
			...props
		});
		registerEvents(props, stage);
		isReady = true;
		return () => {
			stage.destroy();
		};
	});
</script>

<div bind:this={container}>
	{#if isReady}
		{@render children?.()}
	{/if}
</div>
