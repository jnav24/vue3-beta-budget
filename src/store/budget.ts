import { createStore } from 'pinia';
import useHttp from '@/hooks/useHttp';
import useTimestamp from '@/hooks/useTimestamp';

type BudgetState = {
	list: Array<BudgetList>;
};
type BudgetList = {
	id: number;
	name: string;
	budget_cycle: string;
	expenses?: any;
	saved?: string;
};

export const useBudgetStore = createStore({
	id: 'budget',

	state: (): BudgetState => ({
		list: [],
	}),

	getters: {
		sortedBudges() {
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
		async deleteBudget() {
			// ...
		},

		async getBudget(id: string) {
			console.log(id);
			const expenses = {
				banks: [
					{
						id: 150,
						name: 'Wells Fargo',
						amount: '245250.35',
						bank_type_id: 1,
						bank_template_id: 31,
					},
					{
						id: 150,
						name: 'Bank of America',
						amount: '245250.35',
						bank_type_id: 1,
						bank_template_id: 31,
					},
				],
				'credit-cards': [
					{
						id: 141,
						name: 'Visa Black Card',
						limit: '300000',
						last_4: '',
						exp_month: '0',
						exp_year: '0',
						apr: '9.49',
						due_date: 9,
						credit_card_type_id: 1,
						paid_date: '2020-02-08 00:00:00',
						confirmation: 'WXYZ',
						amount: '200',
						balance: '12136.05',
					},
				],
				investments: [],
			};

			return {
				id: 83,
				name: 'April',
				budget_cycle: '2020-04-01 00:00:00',
				saved: '52449.50',
				expenses,
			};
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

		async updateBudget() {
			// ...
		},
	},
});
