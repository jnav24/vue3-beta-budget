import { reactive } from 'vue';
import { BudgetExpense } from '@/store/budget';

export default function useRemoveExpense() {
	const itemToBeRemoved: {
		id: string | number | null;
		type: string | null;
	} = {
		id: null,
		type: null,
	};

	let removeExpenseList: Array<{
		id: number | string;
		type: string;
	}> = [];

	const getRemoveExpenseList = () => removeExpenseList;

	const resetItems = () => {
		itemToBeRemoved.type = null;
		itemToBeRemoved.id = null;
	};

	const resetList = () => removeExpenseList = [];

	const removeExpense = (expenses: Record<string, BudgetExpense[]>) => {
		let tempExpenses = JSON.parse(JSON.stringify(expenses));
		let save = false;

		if (itemToBeRemoved.id && itemToBeRemoved.type) {
			removeExpenseList.push(
				JSON.parse(JSON.stringify(itemToBeRemoved as { id: string | number; type: string }))
			);
			tempExpenses = {
				...expenses,
				[itemToBeRemoved.type]: expenses[itemToBeRemoved.type].filter(
					expense => itemToBeRemoved.id !== expense.id
				),
			};
			save = true;
		}

		resetItems();
		return { expenses: tempExpenses, save };
	};

	const setItemToBeRemoved = (e: {
		id: string | number;
		category: string;
	}) => {
		itemToBeRemoved.id = e.id;
		itemToBeRemoved.type = e.category;
	};

	return {
		getRemoveExpenseList,
		removeExpense,
		resetList,
		setItemToBeRemoved,
	};
}
