<script lang="ts">
	import { getAllContexts } from 'svelte';
	import Button from './Button.svelte';
	import {
		createCounterState,
		getCounterContext,
		hasCounterContext
	} from '$lib/contexts/counter-context.svelte';

	let counter = hasCounterContext() ? getCounterContext() : createCounterState();

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
