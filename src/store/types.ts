import { createStore } from 'pinia';
import useHttp from '@/hooks/useHttp';
import useUtils from '@/hooks/useUtils';
import { BudgetExpense } from '@/store/budget';

const mapTypes = {
	bank: 'banks',
	credit_card: 'creditCards',
	investment: 'investments',
	income: 'incomes',
	utility: 'utilities',
	vehicle: 'vehicles',
};

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

	getters: {
		saveTypes() {
			if (!this.bills.length) {
				return [];
			}

			return this.bills.filter(bill => bill.save_type);
		},

		spendingTypes() {
			if (!this.bills.length) {
				return [];
			}

			return this.bills.filter(bill => !bill.save_type);
		},
	},

	actions: {
		async getAllBillTypes() {
			const { getAuth } = useHttp();
			const { camelCase } = useUtils();
			const data = { path: 'api/types/bill' };
			const response = await getAuth(data);

			if (response.success) {
				const { bill_types, types } = response.data.data;
				this.bills = bill_types;

				for (const [typeName, typeList] of Object.entries(types)) {
					(this as any)[camelCase(typeName)] = typeList;
				}
			}
		},

		getTypeFromExpenseObject<T extends BudgetExpense>(
			item: T
		): CommonExpenseTypeInterface | null {
			const type =
				Object.keys(item)
					.filter((key: string) => /[a-z]*_type_[a-z]*/.exec(key))
					.shift() ?? '';
			const [typeName] = type.split('_type_id');
			const typeIndex = (this as any)[typeName]
				? typeName
				: (mapTypes as any)[typeName] ?? '';

			if (typeIndex.length) {
				const typeObject = (this as any)[typeIndex].find(
					(obj: CommonExpenseTypeInterface) =>
						obj.id === (item as any)[type]
				);
				return typeObject ?? null;
			}

			return null;
		},

		getSlugById(
			type: keyof TypesStateInterface,
			id: number
		): string | undefined {
			return this[type].filter(obj => obj.id === id)?.shift()?.slug;
		},

		getTypeColumnNameFromType(type: string) {
			const { camelCase } = useUtils();
			const typeName = camelCase(type);
			const keyList = Object.keys(mapTypes);
			const valueList = Object.values(mapTypes);
			const index = valueList.indexOf(typeName);
			const placeholder = '_type_id';

			if (index > -1) {
				return `${keyList[index]}${placeholder}`;
			}

			return `${typeName}${placeholder}`;
		},
	},
});

export type BillTypesInterface = {
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

export type TypesStateInterface = {
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
