<script lang="ts">
	import generateNotifications from '$lib/utils/generate-notifications';

	let notifications = $state(generateNotifications());
</script>

<ul>
	{#each notifications as { title, body, date }}
		{@const dateObject = new Date(date)}
		<li>
			<h5>{title}</h5>
			<p>{body}</p>
			<time datetime={dateObject.toISOString()}>{dateObject.toLocaleDateString()}</time>
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
</style>
