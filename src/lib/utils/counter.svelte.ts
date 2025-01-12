import { browser } from '$app/environment';

const storedCount = browser && localStorage.getItem('count');

const count = $state(storedCount ? JSON.parse(storedCount) : { value: 0 });

$effect.root(() => {
	$effect(() => {
		localStorage.setItem('count', JSON.stringify(count));
	});
});

export default count;

export function increment() {
	count.value += 1;
}
export function reset() {
	count.value = 0;
}
