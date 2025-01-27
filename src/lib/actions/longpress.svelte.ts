import type { Action } from 'svelte/action';

const longpress: Action<
	HTMLButtonElement,
	() => { duration?: number },
	{ onlongpress: (e: CustomEvent) => void }
> = (node, getOptions) => {
	$effect(() => {
		const options = getOptions();
		const duration = options.duration === undefined ? 1000 : options.duration;
		let timer: number;

		function handleMouseDown() {
			timer = setTimeout(() => {
				node.dispatchEvent(new CustomEvent('longpress'));
			}, duration);
		}
		function handleMouseUp() {
			clearTimeout(timer);
		}

		node.addEventListener('mousedown', handleMouseDown);
		node.addEventListener('mouseup', handleMouseUp);
		return () => {
			clearTimeout(timer);
			node.removeEventListener('mousedown', handleMouseDown);
			node.removeEventListener('mouseup', handleMouseUp);
		};
	});
};

export default longpress;
