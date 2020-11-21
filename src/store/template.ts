import { createStore } from 'pinia';
import useHttp from '@/hooks/useHttp';
import useUtils from '@/hooks/useUtils';

type TemplateState = {
	canSave: boolean;
	templates: {
		id?: number;
		expenses: Record<string, any[]>;
	};
};

export const useTemplateStore = createStore({
	id: 'template',
	state: (): TemplateState => ({
		canSave: false,
		templates: {
			id: 0,
			expenses: {
				banks: [],
				childcare: [],
				credit_cards: [],
				education: [],
				entertainment: [],
				food: [],
				gift: [],
				housing: [],
				investments: [],
				incomes: [],
				loan: [],
				medical: [],
				miscellaneous: [],
				personal: [],
				shopping: [],
				subscription: [],
				tax: [],
				travel: [],
				utilities: [],
				vehicles: [],
			},
		},
	}),

	getters: {
		expenses() {
			return this.templates.expenses;
		},
	},

	actions: {
		async getTemplates() {
			const { sortObject } = useUtils();
			const { getAuth, getDataFromResponse } = useHttp();

			const data = {
				path: 'budget-templates',
			};
			const response = await getAuth(data);

			if (response.success) {
				const data = getDataFromResponse(response);
				this.templates.id = data.id;
				this.templates.expenses = sortObject(data.expenses);
			}
		},

		async removeExpense(
			expenses: Array<{ id: number | string; type: string }>
		) {
			// ...
		},

		async saveTemplate(expenses: Record<string, any[]>) {
			// ...
		},
	},
});
