function createCounter() {
	let count = $state(0);
	$effect(() => {
		console.log(count);
	});
	return {
		get value() {
			return count;
		},
		increment: () => {
			count += 1;
		},
		reset: () => {
			count = 0;
		}
	};
}

export default createCounter;
