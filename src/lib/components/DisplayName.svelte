<script lang="ts">
	let firstName = $state('Ali');
	let lastName = $state('Alaa');
	let fullName = $derived.by(() => {
		console.log('fullName Derived');
		return `${firstName} ${lastName}`;
	});
	let username = $state('');
	let src = 'https://picsum.photos/250/300';
	let bio = 'Hello, <b>this</b> is me.';

	$effect(() => {
		if (username || fullName) {
			console.log('User has a username or a full name.');
		}
	});
</script>

<button
	onclick={() => {
		console.log(fullName);
	}}>Get Full Name</button
>
<input bind:value={username} />
<input
	value={firstName}
	oninput={(e) => {
		firstName = e.currentTarget.value;
		console.log(fullName);
	}}
/>
<input bind:value={lastName} />
<img {src} alt="A photo of {username || fullName}" />
<h1>{username || fullName}</h1>
<p>{@html bio}</p>

<style>
	h1 {
		color: red;
	}
</style>
