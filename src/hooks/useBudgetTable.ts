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

	return { getHeaders };
}
