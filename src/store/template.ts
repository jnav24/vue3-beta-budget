import { createStore } from 'pinia';

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
		}
	}),

	getters: {
		expenses() {
			return this.templates.expenses;
		},
	},

	actions: {
		async getTemplates() {
			this.templates = {
				"id": 3,
				"expenses": {
					"credit-cards": [
						{
							"id": 1,
							"name": "Visa Black Card",
							"limit": "300000",
							"last_4": "",
							"exp_month": "0",
							"exp_year": "0",
							"apr": "19.49",
							"due_date": 9,
							"credit_card_type_id": 1,
							"amount": "0",
							"balance": "0"
						},
					],
					"utilities": [
						{
							"id": 1,
							"name": "At&t",
							"amount": "115.06",
							"due_date": 2,
							"utility_type_id": 14
						},
					],
					"miscellaneous": [],
					"banks": [
						{
							"id": 31,
							"name": "Wells Fargo",
							"amount": "245250.35",
							"bank_type_id": 1
						},
					],
					"medical": [],
					"investments": [
						{
							"id": 4,
							"name": "RobinHood",
							"amount": "1240940.49",
							"investment_type_id": 1
						},
					],
					"incomes": [
						{
							"id": 6,
							"name": "Pimpin",
							"amount": "12423.13",
							"income_type_id": 1,
							"initial_pay_date": "2019-01-11 00:00:00"
						},
						{
							"id": 7,
							"name": "Pimpin",
							"amount": "12423.13",
							"income_type_id": 1,
							"initial_pay_date": "2019-01-11 00:00:00"
						}
					],
					"vehicles": [],
					"childcare": [],
					"education": [],
					"entertainment": [
						{
							"id": 1,
							"entertainment_type_id": 4,
							"name": "iPic",
							"amount": "24",
							"due_date": 13
						}
					],
					"food": [],
					"gift": [],
					"housing": [],
					"loan": [],
					"personal": [],
					"shopping": [],
					"subscription": [
						{
							"id": 1,
							"subscription_type_id": 3,
							"name": "Netflix",
							"amount": "8.00",
							"due_date": 4
						},
						{
							"id": 2,
							"subscription_type_id": 3,
							"name": "Hulu",
							"amount": "13.99",
							"due_date": 3
						}
					],
					"tax": [],
					"travel": []
				}
			};
		}
	},
});
