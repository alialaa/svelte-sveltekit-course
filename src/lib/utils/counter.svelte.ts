let count = $state(0);

export default {
	get value() {
		return count;
	},
	set value(v) {
		count = v;
	},
	increment() {
		count += 1;
	},
	reset() {
		count = 0;
	}
};
