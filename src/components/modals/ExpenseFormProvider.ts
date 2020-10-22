import { defineComponent, provide } from 'vue';
import { BudgetExpense } from '@/store/budget';

export const ExpenseFormContext = Symbol('Expense Form Provider');

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

			emit('close-modal', false);
		};

		provide(ExpenseFormContext, {
			data: props.data,
			closeModal,
		});
	},
	render() {
		return (this as any).$slots.default();
	},
});
