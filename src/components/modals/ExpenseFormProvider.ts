import { computed, defineComponent, provide, ref } from 'vue';
import { BudgetExpense } from '@/store/budget';
import { ComputedRef, Ref } from '@vue/reactivity';
import { CommonExpenseTypeInterface, useTypesStore } from '@/store';
import { BillTypesInterface, TypesStateInterface } from '@/store/types';

export const ExpenseFormContext = Symbol('Expense Form Provider');

export type ExpenseFormContextType = {
	data: BudgetExpense;
	closeModal: (data: Record<string, string>) => void;
	currentType: Ref<keyof TypesStateInterface>;
	editMode: ComputedRef<boolean>;
	extractFormValues: (form: any) => Record<string, string>;
	typeList: ComputedRef<CommonExpenseTypeInterface[] | BillTypesInterface[]>;
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
			type: String as () => keyof TypesStateInterface,
		},
	},
	setup(props, { emit }) {
		const typeStore = useTypesStore();

		const currentType = ref(props.type);
		const closeModal = (data = {}) => {
			if (Object.keys(data).length) {
				// save data and update the state
			}

			emit('close-modal');
		};
		const editMode = computed(() => props.editMode);
		const typeList = computed(() => typeStore[currentType.value] ?? []);

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
			typeList,
		});
	},
	render() {
		return (this as any).$slots.default();
	},
});
