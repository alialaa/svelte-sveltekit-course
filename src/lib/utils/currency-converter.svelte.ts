class CurrencyConverter {
	#baseValue: number | undefined = $state(1);
	#baseCurrency = $state('usd');
	#baseRates: Record<string, number> = $state({});
	#targetCurrency = $state('eur');
	#targetValue: number | undefined = $state();
	currencies = $state({});
	loading = $state(true);
	error: string | undefined = $state();
	initialBaseCurrency: string | undefined = undefined;
	initialTargetCurrency: string | undefined = undefined;
	initialBaseValue: number | undefined = undefined;

	get baseRates() {
		return this.#baseRates;
	}

	set baseRates(v) {
		this.#baseRates = v;
		this.#targetValue = this.#calculateTarget();
	}

	get targetCurrency() {
		return this.#targetCurrency;
	}

	set targetCurrency(v) {
		this.#targetCurrency = v;
		this.#targetValue = this.#calculateTarget();
	}

	get baseValue() {
		return this.#baseValue;
	}
	set baseValue(v) {
		this.#baseValue = v && v < 0 ? 0 : v;
		this.#targetValue = this.#calculateTarget();
	}

	get baseCurrency() {
		return this.#baseCurrency;
	}

	set baseCurrency(v) {
		this.#baseCurrency = v;
		this.#fetchRates();
	}

	get targetValue() {
		return this.#targetValue;
	}
	set targetValue(v) {
		this.#targetValue = v;
		this.#baseValue = this.#calculateBase();
	}

	constructor(baseValue: number, baseCurrency: string, targetCurrency: string) {
		this.baseValue = baseValue;
		this.baseCurrency = baseCurrency;
		this.targetCurrency = targetCurrency;
		this.initialBaseValue = baseValue;
		this.initialBaseCurrency = baseCurrency;
		this.initialTargetCurrency = targetCurrency;
		this.#loadCurrencies();
		this.#fetchRates();
	}
	async #fetchRates() {
		const res = await fetch(
			`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${this.baseCurrency}.json`
		);
		const resJSON = await res.json();
		this.baseRates = resJSON[this.baseCurrency];
	}

	async #loadCurrencies() {
		this.loading = true;
		this.error = undefined;
		try {
			const res = await fetch(
				'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json'
			).then((r) => r.json());
			this.currencies = res;
		} catch {
			this.error = 'An error has occurred';
		}
		this.loading = false;
	}

	#calculateTarget() {
		return (
			this.baseValue &&
			this.baseRates[this.targetCurrency] &&
			+(this.baseValue * this.baseRates[this.targetCurrency]).toFixed(3)
		);
	}
	#calculateBase() {
		return (
			this.targetValue &&
			this.baseRates[this.targetCurrency] &&
			+(this.targetValue / this.baseRates[this.targetCurrency]).toFixed(3)
		);
	}

	get rate() {
		return this.baseRates[this.targetCurrency];
	}

	switch() {
		const base = this.baseCurrency;
		this.baseCurrency = this.targetCurrency;
		this.targetCurrency = base;
	}

	reset() {
		this.baseValue = this.initialBaseValue;
		this.baseCurrency = this.initialBaseCurrency || '';
		this.targetCurrency = this.initialTargetCurrency || '';
	}
}

export default CurrencyConverter;
