<script lang="ts">
	import { Columns, Rows } from 'lucide-svelte';
	import { alphabetToNumber, cellToIndex, numberToAlphabet, type Cell } from './sheet-utils';

	let { data }: { data: Cell[][] } = $props();

	let editedCell: string | null = $state(null);
	let selectedCell: string | null = $state(null);

	let numRows = $derived(data.length > 10 ? data.length : 10);
	let numCols = $derived.by(() => {
		const largestRow = Math.max(...data.map((row) => row.length));
		return largestRow > 10 ? largestRow : 10;
	});

	function init(el: HTMLInputElement) {
		el.focus();
		el.select();
	}

	function setCell(row: number, col: number, prop: 'value' | 'bgColor' | 'color', value: string) {
		if (data[row]) {
			if (data[row][col]) {
				data[row][col][prop] = value;
			} else {
				data[row][col] = { [prop]: value };
			}
		} else {
			data[row] = [];
			data[row][col] = { [prop]: value };
		}
	}
</script>

<table class="sheet">
	<tbody>
		{#each { length: numRows + 1 }, row}
			<tr>
				{#each { length: numCols + 1 }, column}
					{@const cellData = data[row - 1]?.[column - 1]}
					{@const currentCell = `${row},${column}`}
					<svelte:element
						this={row === 0 || column === 0 ? 'th' : 'td'}
						scope={row === 0 ? 'col' : column === 0 ? 'row' : undefined}
						role="button"
						tabindex="0"
						ondblclick={() => {
							if (row === 0 || column === 0) return;
							editedCell = currentCell;
						}}
						onclick={() => {
							if (currentCell === selectedCell || row === 0 || column === 0) return;
							selectedCell = currentCell;
							editedCell = null;
						}}
						class:selected={selectedCell === currentCell}
						style:background-color={cellData?.bgColor}
						style:color={cellData?.color}
					>
						{#if row === 0 && column > 0}
							{numberToAlphabet(column)}
						{/if}
						{#if row > 0 && column === 0}
							{row}
						{/if}
						{#if row > 0 && column > 0}
							{#if editedCell !== currentCell}
								{cellData?.value || ''}
							{:else}
								<input
									use:init
									type="text"
									value={cellData?.value || ''}
									style:background-color={cellData?.bgColor}
									style:color={cellData?.color}
									oninput={(e) => {
										setCell(row - 1, column - 1, 'value', e.currentTarget.value);
									}}
								/>
							{/if}
						{/if}
					</svelte:element>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	.sheet {
		border-collapse: collapse;
		font-family: sans-serif;
		* {
			box-sizing: border-box;
		}
		tr {
			th {
				background-color: #191919;
			}
			td {
				background-color: #222;
			}
			td.selected {
				outline: 2px solid #3257f8;
				outline-offset: -2px;
			}
			th,
			td {
				min-width: 100px;
				height: 30px;
				border: 1px solid #393939;
				span {
					padding: 5px;
					display: inline-block;
				}
				input {
					width: 100%;
					height: 100%;
					padding: 5px;
					margin: 0;
					border: none;
					font-size: 16px;
					background-color: #222;
					color: #fff;
				}
			}
		}
	}
</style>
