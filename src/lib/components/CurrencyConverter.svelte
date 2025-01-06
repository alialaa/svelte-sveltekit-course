<script lang="ts">
	let baseValue: number | undefined = $state(1);
	let baseCurrency = $state('usd');
	let baseRates: Record<string, number> = $state({});
	let targetCurrency = $state('eur');

	class CurrencyConverter {
		baseValue: number | undefined = $state(1);
	}
	const cc = new CurrencyConverter();

	$effect(() => {
		console.log(cc.baseValue);
	});
	const currenciesPromise = fetch(
		'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json'
	).then((r) => r.json());

	let targetValue = {
		get value() {
			return calculateTarget();
		},
		set value(v) {
			baseValue = calculateBase(v);
		}
	};

	async function fetchRates() {
		const res = await fetch(
			`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`
		);
		const resJSON = await res.json();
		baseRates = resJSON[baseCurrency];
	}

	fetchRates();

	// $effect(() => {
	// 	fetchRates();
	// });

	function calculateTarget() {
		return (
			baseValue && baseRates[targetCurrency] && +(baseValue * baseRates[targetCurrency]).toFixed(3)
		);
	}
	function calculateBase(targetValue?: number) {
		return (
			targetValue &&
			baseRates[targetCurrency] &&
			+(targetValue / baseRates[targetCurrency]).toFixed(3)
		);
	}
</script>

<p>{cc.baseValue}</p>
{#await currenciesPromise}
	<p>Loading...</p>
{:then currencies}
	<div class="wrapper">
		<div class="conversion">
			<span class="base"
				>{Number(1).toLocaleString('en-US', {
					style: 'currency',
					currency: baseCurrency,
					currencyDisplay: 'name'
				})} equals</span
			>
			<span class="target"
				>{baseRates[targetCurrency]?.toLocaleString('en-US', {
					style: 'currency',
					currency: targetCurrency,
					currencyDisplay: 'name'
				})}</span
			>
		</div>
		<div class="base">
			<input type="number" bind:value={baseValue} />
			<select
				bind:value={baseCurrency}
				onchange={() => {
					fetchRates();
				}}
			>
				{#each Object.entries(currencies) as [key, value]}
					<option value={key}>{value}</option>
				{/each}
			</select>
		</div>
		<div class="target">
			<div class="target">
				<input bind:value={targetValue.value} type="number" />
				<select bind:value={targetCurrency}>
					{#each Object.entries(currencies) as [key, value]}
						<option value={key}>{value}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
{:catch error}
	<p>Something went wrong.</p>
{/await}

<style lang="scss">
	.wrapper {
		font-family: Arial, Helvetica, sans-serif;
		background-color: #131313;
		padding: 20px;
		margin: 20px 10px;
		border-radius: 10px;
		.conversion {
			margin-bottom: 20px;
			span.base {
				opacity: 0.6;
				font-size: 14px;
				display: block;
				margin-bottom: 5px;
			}
			span.target {
				font-size: 28px;
				display: block;
			}
		}
		.base {
			margin-bottom: 15px;
		}
		.base,
		.target {
			select,
			input {
				background-color: transparent;
				color: #fff;
				border: 1px solid rgba(255, 255, 255, 0.1);
				border-radius: 5px;
				padding: 10px;
				&:focus-visible {
					outline: 1px solid rgb(65, 189, 209);
				}
			}
			input {
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
			}
		}
	}
</style>
