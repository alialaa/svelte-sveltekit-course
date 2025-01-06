<script lang="ts">
	class CurrencyConverter {
		#baseValue: number | undefined = $state(1);
		#baseCurrency = $state('usd');
		#baseRates: Record<string, number> = $state({});
		#targetCurrency = $state('eur');
		#targetValue: number | undefined = $state();
		currencies = $state({});
		loading = $state(true);
		error: string | undefined = $state();

		get baseRates() {
			return this.#baseRates;
		}

		set baseRates(v) {
			this.#baseRates = v;
			this.#targetValue = this.#calculateTarget();
		}

		get targetCurrency() {
			return this.#targetCurrency;
		}

		set targetCurrency(v) {
			this.#targetCurrency = v;
			this.#targetValue = this.#calculateTarget();
		}

		get baseValue() {
			return this.#baseValue;
		}
		set baseValue(v) {
			this.#baseValue = v && v < 0 ? 0 : v;
			this.#targetValue = this.#calculateTarget();
		}

		get baseCurrency() {
			return this.#baseCurrency;
		}

		set baseCurrency(v) {
			this.#baseCurrency = v;
			this.#fetchRates();
		}

		get targetValue() {
			return this.#targetValue;
		}
		set targetValue(v) {
			this.#targetValue = v;
			this.#baseValue = this.#calculateBase();
		}

		constructor(baseValue: number, baseCurrency: string, targetCurrency: string) {
			this.baseValue = baseValue;
			this.baseCurrency = baseCurrency;
			this.targetCurrency = targetCurrency;
			this.#loadCurrencies();
			this.#fetchRates();
		}
		async #fetchRates() {
			const res = await fetch(
				`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${this.baseCurrency}.json`
			);
			const resJSON = await res.json();
			this.baseRates = resJSON[this.baseCurrency];
		}

		async #loadCurrencies() {
			this.loading = true;
			this.error = undefined;
			try {
				const res = await fetch(
					'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json'
				).then((r) => r.json());
				this.currencies = res;
			} catch {
				this.error = 'An error has occurred';
			}
			this.loading = false;
		}

		#calculateTarget() {
			return (
				this.baseValue &&
				this.baseRates[this.targetCurrency] &&
				+(this.baseValue * this.baseRates[this.targetCurrency]).toFixed(3)
			);
		}
		#calculateBase() {
			return (
				this.targetValue &&
				this.baseRates[this.targetCurrency] &&
				+(this.targetValue / this.baseRates[this.targetCurrency]).toFixed(3)
			);
		}
	}
	const cc = new CurrencyConverter(1, 'usd', 'eur');
</script>

{#if cc.error}
	<p>{cc.error}</p>
{:else if cc.loading}
	<p>Loading...</p>
{:else}
	<div class="wrapper">
		<div class="conversion">
			<span class="base"
				>{Number(1).toLocaleString('en-US', {
					style: 'currency',
					currency: cc.baseCurrency,
					currencyDisplay: 'name'
				})} equals</span
			>
			<span class="target"
				>{cc.baseRates[cc.targetCurrency]?.toLocaleString('en-US', {
					style: 'currency',
					currency: cc.targetCurrency,
					currencyDisplay: 'name'
				})}</span
			>
		</div>
		<div class="base">
			<input type="number" bind:value={cc.baseValue} />
			<select bind:value={cc.baseCurrency}>
				{#each Object.entries(cc.currencies) as [key, value]}
					<option value={key}>{value || key}</option>
				{/each}
			</select>
		</div>
		<div class="target">
			<div class="target">
				<input bind:value={cc.targetValue} type="number" />
				<select bind:value={cc.targetCurrency}>
					{#each Object.entries(cc.currencies) as [key, value]}
						<option value={key}>{value || key}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
{/if}

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
