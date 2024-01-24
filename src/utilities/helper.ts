export function getFormattedCurrency(price: number, currency = 'USD') {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	});

	return formatter.format(price);
}
