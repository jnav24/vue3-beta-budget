import { createStore } from 'pinia';
import useHttp from '@/hooks/useHttp';
import useTimestamp from '@/hooks/useTimestamp';

type BudgetState = {
	list: Array<BudgetList>;
};

export type BudgetExpense = {
	id: number | string;
	budget_id: number;
	name: string;
	amount: string;
	apr?: string;
	balance?: string;
	confirmation?: string;
	due_date?: string;
	exp_month?: string;
	exp_year?: string;
	last_4?: string;
	paid_date?: string;
	initial_pay_date?: string;
	user_vehicle_id?: number;
	do_not_track?: number;
	mileage?: string;
	notes?: string;
	limit?: string;
};

export type BudgetList = {
	id: number;
	name: string;
	budget_cycle: string;
	expenses?: Record<string, Array<BudgetExpense>>;
	saved?: string;
};

export const useBudgetStore = createStore({
	id: 'budget',

	state: (): BudgetState => ({
		list: [],
	}),

	getters: {
		sortedBudgets() {
			const { formatDate } = useTimestamp();
			const budgets: Record<string, Array<BudgetList>> = {};

			this.list.forEach(obj => {
				const year = formatDate('yyyy', obj.budget_cycle);

				if (!budgets[year]) {
					budgets[year] = [];
				}

				budgets[year] = [...budgets[year], obj];
			});

			return budgets;
		},
	},

	actions: {
		async removeBudgets(budget: { id: string | number; type: string }) {
			// @todo build an endpoint for this
			this.list = this.list.filter(item => item.id !== budget.id);
		},

		async getBudget(id: string) {
			const { getAuth, getDataFromResponse } = useHttp();
			const data = {
				path: `budgets/${id}`,
			};
			const response = await getAuth(data);

			if (response.success) {
				const data: BudgetList = getDataFromResponse(response);
				const index = this.list.findIndex(
					obj => obj.id === Number(data.id)
				);

				if (index > -1) {
					this.list[index].expenses = data.expenses;
				} else {
					this.list = [...this.list, data];
				}
			}
		},

		async getBudgets() {
			const { getAuth } = useHttp();

			const data = {
				path: 'budgets',
			};
			const response = await getAuth(data);

			if (response.success) {
				this.list = [...response.data.data.budgets];
			}
		},

		async saveBudget() {
			// ...
		},

		async updateBudget(payload: BudgetList) {
			const { postAuth, getDataFromResponse } = useHttp();
			const data = {
				path: 'budgets',
				params: {
					id: payload.id,
					name: payload.name,
					cycle: payload.budget_cycle,
					expenses: payload.expenses,
				},
			};

			const response = await postAuth(data);

			if (response.success) {
				const data: BudgetList = getDataFromResponse(response);
				const index = this.list.findIndex(item => item.id === data.id);

				if (index > -1) {
					const temp = [...this.list];
					temp[index] = data;
					this.patch({
						list: [...temp],
					});
				}
			}

			return { success: response.success, error: response.error };
		},

		// @todo there is no endpoint for this; have to create it
		async removeBudgetExpenses(
			id: string | number,
			expenses: Array<{ id: string | number; type: string }>
		) {
			const { deleteAuth } = useHttp();
			const data = {
				path: 'budgets',
				params: {
					expenses,
					id,
				},
			};

			const response = await deleteAuth(data);

			if (response.success) {
				const index = this.list.findIndex(list => list.id === id);

				if (index > -1) {
					expenses.forEach(expense => {
						(this.list[index].expenses as any)[expense.type] = (this
							.list[index].expenses as any)[expense.type].filter(
							(exp: BudgetExpense) => exp.id !== expense.id
						);
					});
				}
			}
		},
	},
});
