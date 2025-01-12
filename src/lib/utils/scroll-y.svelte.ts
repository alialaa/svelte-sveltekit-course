import { browser } from '$app/environment';
import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';

class ScrollY {
	#subscriber;
	constructor() {
		this.#subscriber = createSubscriber((update) => {
			console.log('init');
			const off = on(window, 'scroll', update);
			return () => {
				console.log('cleanup');
				off();
			};
		});
	}

	get current() {
		this.#subscriber();
		return browser ? window.scrollY : 0;
	}
}
export default new ScrollY();
