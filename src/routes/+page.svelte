<script lang="ts">
	let textAreaWidth = $state();
	let textAreaHeight = $state();
</script>

{textAreaWidth}x{textAreaHeight}
<textarea bind:offsetWidth={textAreaWidth} bind:offsetHeight={textAreaHeight}></textarea>

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
