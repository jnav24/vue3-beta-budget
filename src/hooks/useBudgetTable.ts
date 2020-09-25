export default function useBudgetTable() {
	const getHeaders = (
		category: string,
		headers: Record<string, Array<string>>
	): string[] => {
		const categoryMap: Record<string, string> = {
			banks: 'savings',
			investments: 'savings',
		};

		if (headers[category]) {
			return headers[category];
		}

		if (!headers[category] && categoryMap[category]) {
			return headers[categoryMap[category]];
		}

		return headers.common;
	};

	const getExpenseValue = (
		header: string,
		item: Record<string, string>
	): string => {
		if (['amount', 'balance'].includes(header)) {
			return `$${item[header]}`;
		}

		if (item[header]) {
			return item[header];
		}

		if (header === 'type') {
			return (
				Object.keys(item)
					.filter((key: string) => /[a-z]*_type_[a-z]*/.exec(key))
					.shift() ?? ''
			);
		}

		if (header === 'due date') {
			if (item['paid_date']) {
				return item['paid_date'];
			}

			if (item['initial_pay_date']) {
				return item['initial_pay_date'];
			}
		}

		return '';
	};

	return { getExpenseValue, getHeaders };
}
