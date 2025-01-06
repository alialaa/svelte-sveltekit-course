<script lang="ts">
	import CurrencyConverter from '$lib/utils/currency-converter.svelte';
	import Button from './Button.svelte';
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
				>{cc.rate?.toLocaleString('en-US', {
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
		<div class="actions">
			<Button
				onclick={() => {
					cc.reset();
				}}>Reset</Button
			>
			<Button
				onclick={() => {
					cc.switch();
				}}>Switch</Button
			>
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
		.actions {
			display: flex;
			justify-content: flex-end;
			margin-top: 30px;
			:global(.button) {
				margin-inline-start: 10px;
			}
		}
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
