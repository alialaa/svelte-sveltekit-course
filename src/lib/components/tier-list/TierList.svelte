<script lang="ts">
	import { v4 as uuid } from 'uuid';
	import tippy from '$lib/actions/tippy.svelte';
	import { ChevronDown, ChevronUp, Minus, Plus, X } from 'lucide-svelte';
	import { defaultTiers, getBase64, type Tier, type TierImage } from './utils';

	let {
		images = $bindable([]),
		tiers = $bindable(defaultTiers)
	}: {
		images?: TierImage[];
		tiers?: Tier[];
	} = $props();

	// $inspect(images);
	let tierLessImages = $derived(images.filter((i) => !i.tier));

	function addImageToTier(image: TierImage, tier: Tier) {
		image.tier = tier.id;
	}
	function removeImage(image: TierImage) {
		if (image.tier) {
			image.tier = undefined;
		} else {
			const index = images.findIndex((i) => i.id === image.id);
			images.splice(index, 1);
		}
	}
	function swapTiers(tier1: number, tier2: number) {
		if (tier1 < 0 || tier1 > tiers.length - 1 || tier2 < 0 || tier2 > tiers.length - 1) return;
		const temp = tiers[tier1];
		tiers[tier1] = tiers[tier2];
		tiers[tier2] = temp;
	}
	function addNewTier(index: number) {
		const label = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
		const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
		tiers.splice(index, 0, { id: uuid(), color, label });
	}
	function deleteTier(index: number) {
		images.forEach((image) => {
			if (image.tier === tiers[index].id) {
				image.tier = undefined;
			}
		});
		tiers.splice(index, 1);
	}
</script>

{#snippet image(image: TierImage)}
	<div class="image">
		<button
			use:tippy={() => ({
				content: document.getElementById(`tiers-for-${image.id}`) || undefined,
				onShown: (instance) => {
					instance.popper.addEventListener('click', () => {
						instance.hide();
					});
				},
				trigger: 'click',
				interactive: true,
				placement: 'bottom'
			})}
		>
			<img src={image.image} alt="" />
		</button>
		<div class="image-tiers" id="tiers-for-{image.id}">
			{#each tiers.filter((t) => image.tier !== t.id) as tier}
				<button
					aria-label="Add Image to Tier {tier.label}"
					class="tier"
					style:background-color={tier.color}
					onclick={() => {
						addImageToTier(image, tier);
					}}>{tier.label}</button
				>
			{/each}
			<button
				aria-label="Remove Image"
				class="tier remove"
				onclick={() => {
					removeImage(image);
				}}
			>
				<X />
			</button>
		</div>
	</div>
{/snippet}

<div class="tiers">
	{#each tiers as tier, index}
		{@const tierImages = images.filter((i) => i.tier === tier.id)}
		<div class="tier">
			<div
				class="label"
				contenteditable="true"
				bind:innerText={tier.label}
				style:background-color={tier.color}
			></div>
			<div class="content">
				{#each tierImages as _image}
					<div class="image-outer">
						{@render image(_image)}
					</div>
				{/each}
			</div>
			<div class="options">
				<div class="option">
					<button
						disabled={index === 0}
						aria-label="Move Tier {tier.label} Up"
						use:tippy={() => ({ content: 'Move Up' })}
						onclick={() => {
							swapTiers(index, index - 1);
						}}
					>
						<ChevronUp />
					</button>
				</div>
				<div class="option">
					<button
						disabled={index === tiers.length - 1}
						aria-label="Move Tier {tier.label} Down"
						use:tippy={() => ({ content: 'Move Down' })}
						onclick={() => {
							swapTiers(index, index + 1);
						}}
					>
						<ChevronDown />
					</button>
				</div>

				<div class="option">
					<button
						aria-label="Add Tier Below Tier {tier.label}"
						use:tippy={() => ({ content: 'Add Tier Below' })}
						onclick={() => {
							addNewTier(index + 1);
						}}
					>
						<Plus />
					</button>
				</div>
				<div class="option">
					<button
						aria-label="Delete Tier {tier.label}"
						use:tippy={() => ({ content: 'Delete Tier' })}
						onclick={() => {
							deleteTier(index);
						}}
					>
						<Minus />
					</button>
				</div>
				<div class="option" use:tippy={() => ({ content: 'Edit Color' })}>
					<input
						type="color"
						class="color-input"
						id="{tier.id}-color"
						aria-label="Edit Tier {tier.label} Color"
						bind:value={tier.color}
					/>
				</div>
			</div>
		</div>
	{/each}
</div>

<div class="images">
	{#each tierLessImages as _image}
		<div class="image-outer">
			{@render image(_image)}
		</div>
	{/each}
</div>

<div class="add-images">
	<div class="input">
		<input
			type="file"
			accept="image/png, image/jpeg, image/svg+xml"
			multiple
			id="images"
			name="images"
			aria-label="Add Images"
			oninput={(e) => {
				[...(e.currentTarget.files || [])].forEach(async (file) => {
					const base64 = await getBase64(file);
					images.push({ id: uuid(), image: base64 as string });
				});
			}}
		/>
		<span>Add Images</span>
	</div>
</div>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	button,
	div,
	input {
		&:focus-visible {
			outline: 2px solid #ff3e00;
		}
	}
	.images {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 10px;
		min-height: 50px;
		margin: 10px -2px 0;
		.image {
			border: 1px dashed #626262;
		}
	}
	.image-outer {
		min-width: 70px;
		width: 10%;
	}
	.image {
		border: 1px dashed #3c3c3c;
		margin: 2px;
		aspect-ratio: 1;
		position: relative;
		transition: 0.5s;
		&:hover {
			border: 1px dashed #ff3e00;
		}
		> button {
			border: none;
			background-color: transparent;
			padding: 10px;
			height: 100%;
			cursor: pointer;
		}
		img {
			max-width: 100%;
			height: 100%;
			object-fit: contain;
		}
		.image-tiers {
			display: flex;
			flex-direction: row;
			margin: 0 -2px;
			.remove {
				background-color: transparent;
				padding: 0;
				:global(svg) {
					stroke: #fff;
					width: 14px;
				}
			}
			.tier {
				width: 20px;
				margin: 2px;
				aspect-ratio: 1;
				color: #111;
				display: flex;
				align-items: center;
				justify-content: center;
				border: none;
				cursor: pointer;
				&:hover {
					filter: saturate(5);
				}
			}
		}
	}
	.tiers {
		background-color: #000;
		.tier {
			display: flex;
			margin: 2px 0;
			background-color: #151515;
			container-type: inline-size;
			position: relative;
			&:hover,
			&:focus-within {
				.options {
					display: flex;
				}
			}
			.options {
				position: absolute;
				display: flex;
				inset-inline-end: 5px;
				top: 5px;
				align-items: center;
				display: none;
				.option {
					margin: 2px;
					button {
						background-color: transparent;
						border: none;
						padding: 0;
						width: 20px;
						height: 20px;
						cursor: pointer;
						:global(svg) {
							stroke: #ffffff;
							width: 20px;
						}
						&[disabled] {
							opacity: 0.4;
							cursor: not-allowed;
						}
					}
				}
				.color-input {
					width: 18px;
					height: 18px;
					cursor: pointer;
					padding: 0;
					margin: 0;
					&::-webkit-color-swatch-wrapper {
						padding: 0;
					}
					&::-webkit-color-swatch {
						border: none;
					}
				}
			}

			.label {
				min-width: 74px;
				width: 10%;
				aspect-ratio: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 5cqw;
				color: #111;
				position: relative;
			}
			.content {
				flex: 1;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 0 4px;
				align-items: center;
			}
		}
	}
	.add-images {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
		.input {
			display: inline-block;
			position: relative;
			cursor: pointer;
			span {
				background-color: #ff3e00;
				padding: 10px 15px;
				display: block;
				position: relative;
				pointer-events: none;
			}
			input#images {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				cursor: pointer;
				&:focus-visible {
					outline: 2px solid #fff;
				}
			}
		}
	}
</style>
