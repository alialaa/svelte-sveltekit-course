<script lang="ts">
	let randomNumber = $state(Math.floor(Math.random() * 10));
	// let doubleRandomNumber = $state();
	let doubleRandomNumber = $derived(randomNumber * 2);

	// $effect(() => {
	// 	doubleRandomNumber = randomNumber * 2;
	// });
</script>

<h2>The random number is: {randomNumber}</h2>
<h2>Double random number is: {doubleRandomNumber}</h2>

<button
	onclick={() => {
		randomNumber = Math.floor(Math.random() * 10);
		console.log({ randomNumber, doubleRandomNumber });
	}}>Generate</button
>
