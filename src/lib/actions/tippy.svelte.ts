import type { Action } from 'svelte/action';
import tippyjs, { type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const tippy: Action<HTMLElement, () => Partial<Props>> = (node, getOptions) => {
	const tooltip = tippyjs(node, getOptions());
	$effect(() => {
		tooltip.setProps(getOptions());
	});
	$effect(() => {
		return () => {
			tooltip.destroy();
		};
	});
};

export default tippy;
