import { computed, defineComponent, provide } from 'vue';
import { BudgetExpense } from '@/store/budget';
import { ComputedRef } from '@vue/reactivity';

export const ExpenseFormContext = Symbol('Expense Form Provider');

export type ExpenseFormContextType = {
	data: BudgetExpense;
	closeModal: (data: Record<string, string>) => void;
	currentType: ComputedRef<string>;
	editMode: ComputedRef<boolean>;
	extractFormValues: (form: any) => Record<string, string>;
};

export default defineComponent({
	props: {
		editMode: {
			required: true,
			type: Boolean,
		},
		data: {
			default: () => ({}),
			type: Object as () => BudgetExpense,
		},
		type: {
			required: true,
			type: String,
		},
	},
	setup(props, { emit }) {
		const currentType = computed(() => props.type);
		const closeModal = (data = {}) => {
			if (Object.keys(data).length) {
				// save data and update the state
			}

			emit('close-modal');
		};
		const editMode = computed(() => props.editMode);

		const extractFormValues = (form: any) => {
			const result: Record<string, string> = {};
			Object.keys(form).forEach(
				value => (result[value] = form[value].value)
			);
			return result;
		};

		provide(ExpenseFormContext, {
			data: props.data,
			closeModal,
			currentType,
			editMode,
			extractFormValues,
		});
	},
	render() {
		return (this as any).$slots.default();
	},
});
