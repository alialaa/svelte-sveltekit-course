<script lang="ts">
	import CurrencyConverter from '$lib/components/CurrencyConverter.svelte';

	import CC from '$lib/utils/currency-converter.svelte';

	const cc = new CC(10, 'gbp', 'usd');
</script>

{cc.rate}
{cc.baseCurrency}
{cc.baseValue}
{cc.targetValue}
<CurrencyConverter />

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}
</style>
