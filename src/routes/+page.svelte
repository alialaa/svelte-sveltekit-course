<script lang="ts">
	import Notification from '$lib/components/Notification.svelte';
	import generateNotifications from '$lib/utils/generate-notifications';

	let notifications = $state(generateNotifications(3));
</script>

<ul>
	{#each notifications as notification, index}
		<li>
			<Notification
				{notification}
				onremove={(id) => {
					notifications.splice(index, 1);
				}}
			/>
		</li>
	{:else}
		<p>No notifications</p>
	{/each}
</ul>

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}

	ul {
		list-style: none;
		padding: 10px;
		margin: 0;
		li {
			margin-bottom: 10px;
		}
	}
</style>
