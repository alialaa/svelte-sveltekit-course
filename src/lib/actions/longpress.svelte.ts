import type { Action } from 'svelte/action';

const longpress: Action<
	HTMLButtonElement,
	() => { duration?: number },
	{ onlongpress: (e: CustomEvent) => void }
> = (node, getOptions) => {
	$effect(() => {
		const options = getOptions();
		const duration = options.duration || 1000;
		console.log(duration);
		console.log('Mounted');
		return () => {
			console.log('Destroyed');
		};
	});
};

export default longpress;
