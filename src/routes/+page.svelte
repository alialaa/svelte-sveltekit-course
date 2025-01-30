<script lang="ts">
	import VideoPlayer, { getAllVideos, playAll, pauseAll } from '$lib/components/VideoPlayer.svelte';
	let showVideo = $state(true);
</script>

<input type="checkbox" bind:checked={showVideo} />
<br />
<button
	onclick={() => {
		console.log(getAllVideos());
	}}>Get All Videos</button
>
<button onclick={playAll}>Play All</button>
<button onclick={pauseAll}>Pause All</button>

<VideoPlayer
	src="https://previews.customer.envatousercontent.com/844b6649-89a3-4702-a04e-b9b2a496ff52/watermarked_preview/watermarked_preview.mp4"
/>
<br />
<VideoPlayer
	src="https://previews.customer.envatousercontent.com/ccbfcd3f-38ff-4f9b-8e0a-0b9f1efc92a4/watermarked_preview/watermarked_preview.mp4"
/>
<br />
{#if showVideo}
	<VideoPlayer
		src="https://previews.customer.envatousercontent.com/032e40ac-a680-40ea-a12d-9b0261d00eda/watermarked_preview/watermarked_preview.mp4"
	/>
{/if}

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
			padding: 20px;
			margin: 0;
		}
	}
</style>
