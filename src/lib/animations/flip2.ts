import { interpolateBasis } from 'd3';
import type { AnimationConfig } from 'svelte/animate';
import { cubicInOut } from 'svelte/easing';

export default function flip2(
	node: HTMLElement,
	{ from, to }: { from: DOMRect; to: DOMRect },
	{ delay = 0, duration = 300, easing = cubicInOut }
): AnimationConfig {
	const dx = from.left - to.left;
	const dy = from.top - to.top;
	return {
		delay,
		duration,
		easing,
		css: (t, u) => {
			const scaleInterpolator = interpolateBasis([1, 1.07, 1]);

			return `transform: scale(${scaleInterpolator(t)}) translate(${u * dx}px, ${u * dy}px)`;
		}
	};
}
