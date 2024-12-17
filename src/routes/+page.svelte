<script lang="ts">
	import Sheet from '$lib/components/sheet/Sheet.svelte';

	let data = $state([
		[
			{ value: 'Item', bgColor: '#6aa84f', color: '#ffffff' },
			{ value: 'Price', bgColor: '#6aa84f', color: '#ffffff' },
			{ value: 'Quantity', bgColor: '#6aa84f', color: '#ffffff' },
			{ value: 'Total', bgColor: '#51803d', color: '#ffffff' }
		],
		[{ value: 'Milk' }, { value: '3' }, { value: '2' }, { value: '=MULTIPLY(B2,C2)' }],
		[{ value: 'Oats' }, { value: '4' }, { value: '1' }, { value: '=MULTIPLY(B3,C3)' }],
		[{ value: 'Honey' }, { value: '5' }, { value: '2' }, { value: '=MULTIPLY(B4,C4)' }],
		[{ value: 'Strawberries' }, { value: '2' }, { value: '2' }, { value: '=MULTIPLY(B5,C5)' }],
		[
			{ value: '', bgColor: '#b4a7d6' },
			{ value: '', bgColor: '#b4a7d6' },
			{ value: 'Total', bgColor: '#b4a7d6' },
			{ value: '=SUM(D2,D3,D4,D5)', bgColor: '#8e7eb6' }
		]
	]);
</script>

<Sheet bind:data />

<pre>
	{JSON.stringify(data, null, 2)}
</pre>

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}
</style>
