import { cubicInOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export default function fadeJS(
	node: HTMLElement,
	{ delay = 0, duration = 400, easing = cubicInOut }
): TransitionConfig {
	const originalOpacity = +getComputedStyle(node).opacity;
	return {
		delay,
		duration,
		easing,
		tick: (t) => {
			node.style.opacity = `${t * originalOpacity}`;
		}
	};
}
