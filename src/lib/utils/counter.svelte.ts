import { browser } from '$app/environment';

class Counter {
	#count = $state(0);

	get value() {
		const storedValue = browser && localStorage.getItem('count');
		if (storedValue) {
			this.#count = JSON.parse(storedValue);
		}
		return this.#count;
	}
	set value(v) {
		localStorage.setItem('count', JSON.stringify(v));
		this.#count = v;
	}

	constructor() {
		this.increment = this.increment.bind(this);
		this.reset = this.reset.bind(this);
	}

	increment() {
		this.value += 1;
	}
	reset() {
		this.value = 0;
	}
}

export default new Counter();
