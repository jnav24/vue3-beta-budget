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

		getType(type: string, id: number): CommonExpenseTypeInterface | null {
			const mapTypes = {
				bank: 'banks',
				credit_card: 'creditCards',
				investment: 'investments',
				income: 'incomes',
				utility: 'utilities',
				vehicle: 'vehicles',
			};
			const [typeName] = type.split('_type_id');
			const typeIndex = (this as any)[typeName]
				? typeName
				: (mapTypes as any)[typeName] ?? '';

			if (typeIndex.length) {
				const typeObject = (this as any)[typeIndex].find(
					(obj: CommonExpenseTypeInterface) => obj.id === id
				);
				return typeObject ?? null;
			}

			return null;
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
