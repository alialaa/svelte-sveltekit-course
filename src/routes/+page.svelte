<script lang="ts">
	const target = {
		firstName: 'Ali',
		lastName: 'Alaa',
		occupations: [],
		get fullName() {
			return `${this.firstName} ${this.lastName}`;
		},
		set occupation(value: string) {
			console.log(`Adding ${value} to occupations`);
			this.occupations.push(value);
		}
	};

	const handler = {
		get(target, prop) {
			// console.log(target, prop);
			return prop in target ? target[prop] : 'NA';
		},
		set(target, prop, value) {
			if (['firstName', 'lastName'].includes(prop)) {
				if (typeof value !== 'string') {
					throw new TypeError(`Property ${prop} must be a string.`);
				}
			}
			target[prop] = value;
			return true;
		}
	};
	const proxy = new Proxy(target, handler);
	proxy.firstName = 'Omar';
	console.log(proxy.firstName);
</script>

<style>
	:global {
		body {
			background-color: #222;
		}
	}
</style>
