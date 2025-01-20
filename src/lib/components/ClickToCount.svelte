<script lang="ts">
	import { getAllContexts, getContext, hasContext } from 'svelte';
	import Button from './Button.svelte';

	const hasCountContext = hasContext('count');

	function createLocalState() {
		let count = $state(0);
		return {
			get value() {
				return count;
			},
			increment: () => {
				count += 1;
			},
			reset: () => {
				count = 0;
			}
		};
	}

	let counter = hasCountContext
		? getContext<{
				value: number;
				increment: () => void;
				reset: () => void;
			}>('count')
		: createLocalState();

	console.log(getAllContexts());
</script>

<div class="wrapper">
	<h2>{counter.value}</h2>
	<Button onclick={counter.increment}>Increment</Button>
	<Button --buttonBgColor="#fff" --buttonTextColor="#000" onclick={counter.reset}>Reset</Button>
</div>

<style>
	.wrapper {
		text-align: center;
		background-color: #111;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 10px;
		h2 {
			font-size: 60px;
			margin: 0 0 20px;
			line-height: 1;
		}
	}
</style>
