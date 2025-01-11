const count = $state({ value: 0 });

export default count;

export function increment() {
	count.value += 1;
}
export function reset() {
	count.value = 0;
}
