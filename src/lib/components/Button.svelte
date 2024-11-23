<script lang="ts">
	import type { Snippet } from 'svelte';
	let isLeftHovered = $state(false);

	interface Props {
		left?: Snippet<[boolean]>;
		right?: Snippet;
		children: Snippet<[boolean]>;
	}
	let { left, right, children }: Props = $props();
</script>

<button>
	{#if left}
		<div
			role="presentation"
			class="left-content"
			onmouseenter={() => {
				isLeftHovered = true;
			}}
			onmouseleave={() => {
				isLeftHovered = false;
			}}
		>
			{@render left(isLeftHovered)}
		</div>
	{/if}
	{@render children(isLeftHovered)}
	{#if right}
		<div class="right-content">
			{@render right()}
		</div>
	{/if}
</button>

<style>
	button {
		border: none;
		background-color: #ff3e00;
		color: #ffffff;
		padding: 0 20px;
		height: 45px;
		font-weight: bold;
		border-radius: 5px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.left-content {
		margin-inline-end: 10px;
	}
	.right-content {
		margin-inline-start: 10px;
	}
</style>
