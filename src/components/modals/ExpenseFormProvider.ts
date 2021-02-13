import { computed, defineComponent, provide, ref, watchEffect } from 'vue';
import { BudgetExpense } from '@/store/budget';
import { ComputedRef, Ref } from '@vue/reactivity';
import { CommonExpenseTypeInterface, useTypesStore } from '@/store';
import { BillTypesInterface, TypesStateInterface } from '@/store/types';
import useTimestamp from '@/hooks/useTimestamp';
import useUtils from '@/hooks/useUtils';

export const ExpenseFormContext = Symbol('Expense Form Provider');

export type ExpenseFormContextType = {
	budgetCycle: ComputedRef<string>;
	data: BudgetExpense;
	closeModal: (data: Record<string, string>) => void;
	currentType: Ref<keyof TypesStateInterface>;
	dates: Array<{ label: number; value: number }>;
	editMode: ComputedRef<boolean>;
	extractFormValues: (form: any) => Record<string, string>;
	getTypeId: () => number;
	hideSidebar: boolean;
	typeList: ComputedRef<CommonExpenseTypeInterface[] | BillTypesInterface[]>;
};

export default defineComponent({
	props: {
		budgetCycle: {
			default: '',
			type: String,
		},
		editMode: {
			required: true,
			type: Boolean,
		},
		hideSidebar: {
			default: false,
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
		const { camelCase } = useUtils();
		const { formatDate } = useTimestamp();

		const currentType = ref(props.type);

		watchEffect(() => (currentType.value = props.type));

		const closeModal = (data = {}) => {
			if (Object.keys(data).length) {
				return emit('close-modal', {
					type: currentType.value,
					data: {
						...props.data,
						...data,
					},
				});
			}

			emit('close-modal');
		};
		const editMode = computed(() => props.editMode);
		const hideSidebar = computed(() => props.hideSidebar);
		const typeList = computed(
			() =>
				typeStore[
					camelCase(currentType.value) as keyof TypesStateInterface
				] ?? []
		);

		const getTypeKey = () => {
			return Object.keys(props.data)
				.filter(key => /[a-z]*_type_[a-z]*/.exec(key))
				.shift();
		};

		const getTypeId = () => {
			const keyName = getTypeKey();
			return keyName ? props.data[keyName as keyof BudgetExpense] : 0;
		};

		const extractFormValues = (form: any) => {
			const result: Record<string, string | null> = {};
			Object.keys(form).forEach(value => {
				const key = value === 'type' ? getTypeKey() ?? value : value;
				if (key === 'paid_date' && !form[value].value.length) {
					result[key] = null;
				} else {
					result[key] = form[value].value;
				}
			});

			if (
				// eslint-disable-next-line no-prototype-builtins
				result.hasOwnProperty('paid_date') &&
				result.confirmation?.length
			) {
				result.paid_date = formatDate('yyyy-MM-dd');
			}

			if (
				// eslint-disable-next-line no-prototype-builtins
				result.hasOwnProperty('paid_date') &&
				!result.confirmation?.length
			) {
				result.paid_date = null;
			}

			return result;
		};

		provide(ExpenseFormContext, {
			budgetCycle: computed(() => props.budgetCycle),
			data: props.data,
			closeModal,
			currentType,
			dates: Array.from(Array(31).keys()).map((num: number) => ({
				label: num + 1,
				value: num + 1,
			})),
			editMode,
			extractFormValues,
			getTypeId,
			hideSidebar,
			typeList,
		});
	},
	render() {
		return (this as any).$slots.default();
	},
});
