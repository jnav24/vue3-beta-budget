import { useTypesStore, useUserStore } from '@/store';
import useCurrency from '@/hooks/useCurrency';

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
		const { formatDollar } = useCurrency();
		const typesStore = useTypesStore();
		const userStore = useUserStore();

		if (['amount', 'balance'].includes(header)) {
			return `$${formatDollar(item[header])}`;
		}

		if (header === 'vehicle' && item.user_vehicle_id) {
			const vehicle = userStore.getVehicleName(+item.user_vehicle_id);
			return vehicle
				? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
				: '';
		}

		if (item[header]) {
			return item[header];
		}

		if (header === 'type') {
			const typeObj = typesStore.getTypeFromExpenseObject(item as any);
			return typeObj?.name ?? '';
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
