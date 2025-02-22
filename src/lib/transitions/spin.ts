import { cubicInOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export default function spin(
	node: HTMLElement,
	{ delay = 0, duration = 400, easing = cubicInOut, spin = 1 }
): TransitionConfig {
	const originalOpacity = +getComputedStyle(node).opacity;
	const originalTransform = getComputedStyle(node).transform.replace('none', '');
	return {
		delay,
		duration,
		easing,
		css: (t) => {
			return `
        opacity: ${t * originalOpacity};
        transform: ${originalTransform} scale(${t}) rotate(${spin * 360 * t}deg)
      `;
		}
	};
}
