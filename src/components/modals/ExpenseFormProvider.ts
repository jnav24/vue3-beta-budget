import { defineComponent, provide } from 'vue';
import { BudgetExpense } from '@/store/budget';

export const ExpenseFormContext = Symbol('Expense Form Provider');

export type ExpenseFormContextType = {
	data: BudgetExpense,
	closeModal: (data: Record<string, string>) => void,
	extractFormValues: (form: any) => Record<string, string>,
};

export default defineComponent({
	props: {
		data: {
			default: () => ({}),
			type: Object as () => BudgetExpense,
		},
	},
	setup(props, { emit }) {
		const closeModal = (data = {}) => {
			if (Object.keys(data).length) {
				// save data and update the state
			}

			emit('close-modal');
		};

		const extractFormValues = (form: any) => {
			const result: Record<string, string> = {};
			Object.keys(form).forEach(value => result[value] = form[value].value);
			return result;
		};

		provide(ExpenseFormContext, {
			data: props.data,
			closeModal,
			extractFormValues,
		});
	},
	render() {
		return (this as any).$slots.default();
	},
});
