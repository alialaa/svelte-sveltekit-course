<script lang="ts">
	let data: { text: string } | undefined = $state({ text: 'Hello' });
	$effect(() => {
		setTimeout(() => {
			data = undefined;
		}, 1000);
	});
</script>

<h2>{data?.text || 'FallbackText'}</h2>

<button
	onclick={() => {
		console.log(data.text);
	}}>Test</button
>
