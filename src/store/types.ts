import { createStore } from 'pinia';
import useHttp from '@/hooks/useHttp';
import useUtils from '@/hooks/useUtils';

export const useTypesStore = createStore({
	id: 'types',

	state: (): TypesStateInterface => ({
		banks: [],
		bills: [],
		childcare: [],
		creditCards: [],
		education: [],
		entertainment: [],
		food: [],
		gift: [],
		housing: [],
		investments: [],
		incomes: [],
		loan: [],
		medical: [],
		personal: [],
		shopping: [],
		subscription: [],
		tax: [],
		travel: [],
		utilities: [],
		vehicles: [],
	}),

	actions: {
		async getAllBillTypes() {
			const { getAuth } = useHttp();
			const { camelCase } = useUtils();
			const data = { path: 'types/bill' };
			const response = await getAuth(data);

			if (response.success) {
				const { bill_types, types } = response.data.data;
				this.bills = bill_types;

				for (const [typeName, typeList] of Object.entries(types)) {
					(this as any)[camelCase(typeName)] = typeList;
				}
			}
		},
	},
});

type BillTypesInterface = {
	id: number;
	name: string;
	slug: string;
	save_type: number;
	created_at?: string;
	updated_at?: string;
};

export type CommonExpenseTypeInterface = {
	id: number;
	name: string;
	slug: string;
};

type TypesStateInterface = {
	banks: CommonExpenseTypeInterface[];
	bills: BillTypesInterface[];
	childcare: CommonExpenseTypeInterface[];
	creditCards: CommonExpenseTypeInterface[];
	education: CommonExpenseTypeInterface[];
	entertainment: CommonExpenseTypeInterface[];
	food: CommonExpenseTypeInterface[];
	gift: CommonExpenseTypeInterface[];
	housing: CommonExpenseTypeInterface[];
	investments: CommonExpenseTypeInterface[];
	incomes: CommonExpenseTypeInterface[];
	loan: CommonExpenseTypeInterface[];
	medical: CommonExpenseTypeInterface[];
	personal: CommonExpenseTypeInterface[];
	shopping: CommonExpenseTypeInterface[];
	subscription: CommonExpenseTypeInterface[];
	tax: CommonExpenseTypeInterface[];
	travel: CommonExpenseTypeInterface[];
	utilities: CommonExpenseTypeInterface[];
	vehicles: CommonExpenseTypeInterface[];
};
