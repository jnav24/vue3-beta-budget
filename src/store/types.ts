import { defineStore } from 'pinia';

export const useTypesStore = defineStore({
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
			this.banks = [{ id: 4, name: 'Checking', slug: 'checking' }];
			this.bills = [
				{
					id: 4,
					name: 'Banks',
					slug: 'banks',
					created_at: '2019-01-28 05:03:49',
					updated_at: '2019-01-28 05:03:49',
					save_type: 1,
				},
				{
					id: 9,
					name: 'Childcare',
					slug: 'childcare',
					created_at: '2020-08-02 18:42:18',
					updated_at: '2020-08-02 18:42:18',
					save_type: 0,
				},
				{
					id: 1,
					name: 'Credit Cards',
					slug: 'credit-cards',
					created_at: '2019-01-28 05:03:49',
					updated_at: '2019-01-28 05:03:49',
					save_type: 0,
				},
				{
					id: 2,
					name: 'Incomes',
					slug: 'incomes',
					created_at: '2019-01-28 05:03:49',
					updated_at: '2019-01-28 05:03:49',
					save_type: 0,
				},
				{
					id: 3,
					name: 'Vehicles',
					slug: 'vehicles',
					created_at: '2019-01-28 05:03:49',
					updated_at: '2019-01-28 05:03:49',
					save_type: 0,
				},
			];
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
