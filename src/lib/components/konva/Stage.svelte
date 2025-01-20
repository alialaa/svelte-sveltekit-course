<script lang="ts">
	import Konva from 'konva';
	import type { Snippet } from 'svelte';

	let { children, ...props }: { children?: Snippet } & Konva.StageConfig = $props();
	let container: HTMLDivElement;
	let stage: Konva.Stage;

	$effect(() => {
		stage = new Konva.Stage({
			container,
			...props
		});
		return () => {
			stage.destroy();
		};
	});
</script>

<div bind:this={container}>
	{@render children?.()}
</div>
