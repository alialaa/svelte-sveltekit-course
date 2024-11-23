<script>
	import Button from '$lib/components/Button.svelte';
	import { AlarmCheck, Search } from 'lucide-svelte';
</script>

<Button>
	{#snippet left()}
		<Search />
	{/snippet}
	Text
	{#snippet right()}
		<AlarmCheck />
	{/snippet}
</Button>
