<script lang="ts">
	import tippy from '$lib/actions/tippy.svelte';
	import { Minus, Pause, Play, Plus, Volume2, VolumeOff } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { src }: { src: string } = $props();
	let duration = $state(0);
	let currentTime = $state(0);
	let paused = $state(true);
	let seeking = $state(false);
	let playbackRate = $state(1);
	let volume = $state(1);
	let muted = $state(true);
	let buffered = $state([{ start: 0, end: 0 }]);
	let showVolume = $state(false);

	const possibleRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
	const iconsSize = 20;

	let volumeTimeout: number;
	function showVolumeProgress() {
		clearTimeout(volumeTimeout);
		showVolume = true;
		muted = false;
		volumeTimeout = setTimeout(() => {
			showVolume = false;
		}, 3000);
	}

	function formatTime(time: number) {
		if (isNaN(time)) return '';

		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);

		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}
</script>

<div class={['player', { paused }]}>
	<!-- svelte-ignore a11y_media_has_caption -->
	<video
		{src}
		onclick={() => {
			paused = !paused;
		}}
		bind:duration
		bind:currentTime
		bind:paused
		bind:seeking
		bind:playbackRate
		bind:volume
		bind:buffered
		bind:muted
	></video>
	<div
		class="slider"
		onpointerdown={(e) => {
			const div = e.currentTarget;

			function seek(e: PointerEvent) {
				const { left, width } = div.getBoundingClientRect();

				let p = (e.clientX - left) / width;
				if (p < 0) p = 0;
				if (p > 1) p = 1;

				currentTime = p * duration;
			}

			seek(e);

			window.addEventListener('pointermove', seek);

			window.addEventListener(
				'pointerup',
				() => {
					window.removeEventListener('pointermove', seek);
				},
				{
					once: true
				}
			);
		}}
	>
		<div
			class="buffer"
			style="--start: {buffered?.[0]?.start / duration}; --end: {buffered?.[0]?.end / duration}"
		></div>
		<div class="progress" style="--progress: {currentTime / duration}%"></div>
	</div>
	<div class="controls">
		<div class="play-time">
			<button
				use:tippy={() => ({ content: paused ? 'Play' : 'Pause', placement: 'bottom' })}
				aria-label={paused ? 'Play' : 'Pause'}
				onclick={() => {
					paused = !paused;
				}}
			>
				{#if paused}
					<Play size={iconsSize} />
				{:else}
					<Pause size={iconsSize} />
				{/if}
			</button>
			<span class="time">{formatTime(currentTime)} / {formatTime(duration)}</span>
		</div>
		<div class="vol-rate">
			<button
				use:tippy={() => ({ content: muted ? 'Unmute' : 'Mute', placement: 'bottom' })}
				aria-label={muted ? 'Unmute' : 'Mute'}
				onclick={() => {
					muted = !muted;
				}}
				>{#if muted}
					<Volume2 size={iconsSize} />
				{:else}
					<VolumeOff size={iconsSize} />
				{/if}</button
			>

			<button
				aria-label="Volume Down"
				use:tippy={() => ({ content: 'Volume Down', placement: 'bottom' })}
				onclick={() => {
					volume -= 0.1;
					if (volume <= 0) {
						volume = 0;
					}
					showVolumeProgress();
				}}><Minus size={iconsSize} /></button
			>
			<button
				aria-label="Volume Up"
				use:tippy={() => ({ content: 'Volume Up', placement: 'bottom' })}
				onclick={() => {
					volume += 0.1;
					if (volume >= 1) {
						volume = 1;
					}
					showVolumeProgress();
				}}><Plus size={iconsSize} /></button
			>

			<button
				use:tippy={() => ({ content: 'Change Playback Rate', placement: 'bottom' })}
				aria-label="Change Playback Rate"
				onclick={() => {
					const currIndex = possibleRates.indexOf(playbackRate);
					let newIndex = 0;
					if (currIndex === possibleRates.length - 1) {
						newIndex = 0;
					} else {
						newIndex = currIndex + 1;
					}
					playbackRate = possibleRates[newIndex];
				}}>x{playbackRate}</button
			>
		</div>
	</div>
	{#if showVolume}
		<div class="volume-level" transition:fly={{ y: -5, duration: 300 }}>
			<progress max={1} value={volume}></progress>
		</div>
	{/if}
</div>

<style lang="scss">
	.player {
		background-color: #211818;
		border: 1px solid #b96b49;
		transition: 0.3s;
		padding: 10px;
		position: relative;
		&.paused {
			border: 1px solid #4d2b1d;
			background-color: #211d1c;
		}
	}
	.volume-level {
		position: absolute;
		top: 10px;
		inset-inline-end: 20px;
		progress[value] {
			-webkit-appearance: none;
			appearance: none;
			border-radius: 0;
			height: 10px;
			border: 1px solid #4d2b1d;
			&::-webkit-progress-bar {
				background-color: #211d1c;
			}
			&::-webkit-progress-value {
				background-color: #ff3e00;
			}
		}
	}
	.controls {
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.play-time {
			display: flex;
			align-items: center;
			span.time {
				margin-inline-start: 15px;
				color: #e48e68;
			}
		}
		.vol-rate {
			display: flex;
			align-items: center;
			button {
				margin-inline-start: 5px;
			}
		}
	}
	video {
		max-width: 100%;
		vertical-align: middle;
	}
	button {
		padding: 0 5px;
		margin: 0;
		border: none;
		background: transparent;
		font-size: 16px;
		border: 1px solid #4d2b1d;
		color: #ff3e00;
		min-width: 40px;
		cursor: pointer;
		height: 35px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.3s;
		&:hover {
			background-color: #4d2b1d;
		}
		:global(svg) {
			vertical-align: middle;
		}
	}
	.slider {
		height: 5px;
		margin-top: 10px;
		border: 1px solid #4d2b1d;
		position: relative;
		.buffer {
			position: absolute;
			height: 100%;
			background-color: #0000003c;
			inset-inline-start: calc(100% * var(--start));
			inset-inline-end: calc(100% * (1 - var(--end)));
			transition: 0.3s;
		}
		.progress {
			background-color: #ff3e00;
			width: calc(100 * var(--progress));
			height: 100%;
			position: relative;
		}
	}
</style>
