<script lang="ts">
	import Konva from 'konva';
	import type { Snippet } from 'svelte';
	import { setStageContext } from './konva-context';

	let { children, ...props }: { children?: Snippet } & Konva.StageConfig = $props();
	let container: HTMLDivElement;
	let stage: Konva.Stage;
	let isReady = $state(false);

	setStageContext(() => stage);

	$effect(() => {
		stage = new Konva.Stage({
			container,
			...props
		});
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
