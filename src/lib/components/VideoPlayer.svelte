<script lang="ts">
	let { src }: { src: string } = $props();
	let duration = $state(0);
	let currentTime = $state(0);
	let paused = $state(true);
	let seeking = $state(false);
	let playbackRate = $state(1);
	let volume = $state(1);
	let buffered = $state([{ start: 0, end: 0 }]);
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video
	{src}
	bind:duration
	bind:currentTime
	bind:paused
	bind:seeking
	bind:playbackRate
	bind:volume
	bind:buffered
></video>

<ul>
	<li>duration: {duration}</li>
	<li>currentTime: {currentTime}</li>
	<li>paused: {paused}</li>
	<li>seeking: {seeking}</li>
	<li>playbackRate: {playbackRate}</li>
	<li>volume: {volume}</li>
	<li>buffered: {JSON.stringify(buffered)}</li>
</ul>

<style lang="scss">
	video {
		max-width: 100%;
	}
</style>
