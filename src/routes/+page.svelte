<script lang="ts">
	let array = $state([1, 2, 3, 4]);
	let objectsArray = $state([{ id: 1 }, { id: 2 }]);
	let object = $state({
		firstName: 'Ali',
		lastName: 'Alaa',
		address: {
			city: 'City',
			street: 'Street'
		}
	});

	// $inspect(object).with(console.trace);

	// $effect(() => {
	// 	$inspect.trace();
	// 	console.log(object.firstName);
	// 	console.log(object.address.city);
	// });
</script>

<!-- {@debug object, array} -->
<h2>{object.firstName}</h2>
<h2>{object.address.city}</h2>

<input bind:value={object.firstName} />
<input bind:value={object.address.city} />
<input bind:value={object.address.street} />
<p>{array}</p>
<button
	onclick={() => {
		array[1] = Math.random() * 10;
	}}>Add to array</button
>

<button
	onclick={() => {
		console.log($state.snapshot(object));
	}}
>
	Log Snapshot
</button>

<style>
	:global {
		body {
			background-color: #222;
			color: #fff;
		}
	}
</style>
