import { getContext, hasContext, setContext } from 'svelte';

type CounterContext = {
	value: number;
	increment: () => void;
	reset: () => void;
};

const key = Symbol('count');

export function setCounterContext(counter: CounterContext) {
	setContext(key, counter);
}
export function getCounterContext() {
	return getContext(key) as CounterContext;
}

export function hasCounterContext() {
	return hasContext(key);
}

export function createCounterState(initial = 0) {
	let count = $state(initial);
	return {
		get value() {
			return count;
		},
		increment: () => {
			count += 1;
		},
		reset: () => {
			count = 0;
		}
	};
}
