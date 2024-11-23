<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		left?: Snippet;
		right?: Snippet;
		children: Snippet;
	}
	let { left, right, children }: Props = $props();
</script>

<button>
	{#if left}
		<div class="left-content">
			{@render left()}
		</div>
	{/if}
	{@render children()}
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
