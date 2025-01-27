<script lang="ts">
	import tippy from '$lib/actions/tippy.svelte';

	let content = $state('Initial Text');
</script>

<input type="text" bind:value={content} />
<button
	use:tippy={() => ({
		content,
		animation: 'scale'
	})}>Button</button
>

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
