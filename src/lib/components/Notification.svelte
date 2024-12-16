<script lang="ts">
	import Button from './Button.svelte';

	let {
		notification,
		onremove
	}: {
		notification: {
			id: string;
			title: string;
			body: string;
			date: number;
		};
		onremove?: (id: string) => void;
	} = $props();

	const { title, body, date, id } = $derived(notification);
	const dateObject = $derived(new Date(date));
</script>

<div class="notification">
	<h5>{title}</h5>
	<p>{body}</p>
	<time datetime={dateObject.toISOString()}>{dateObject.toLocaleDateString()}</time>
	<div class="actions">
		<Button
			--buttonBgColor="rgb(218, 84, 84)"
			onclick={() => {
				onremove?.(id);
			}}>Remove</Button
		>
	</div>
</div>

<style lang="scss">
	.notification {
		border: 1px solid #3a3a3a;
		background-color: #1e1e1efa;
		padding: 15px;
		border-radius: 5px;
		font-family: Arial, Helvetica, sans-serif;
		.actions {
			display: flex;
			justify-content: flex-end;
		}
		h5 {
			margin: 0 0 10px;
			font-size: 20px;
		}
		p {
			margin: 0 0 10px;
		}
	}
</style>
