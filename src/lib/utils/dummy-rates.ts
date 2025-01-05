const rates: Record<string, Record<string, number>> = {
	usd: {
		eur: 0.96,
		gbp: 0.8,
		usd: 1
	},
	eur: {
		eur: 1,
		gbp: 0.83,
		usd: 1.04
	},
	gbp: {
		eur: 1.21,
		gbp: 1,
		usd: 1.25
	}
};

export default rates;
