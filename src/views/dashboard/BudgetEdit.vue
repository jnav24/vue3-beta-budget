<script lang="ts">
import {
	computed,
	defineComponent,
	onMounted,
	reactive,
	ref,
	watch,
	watchEffect,
} from 'vue';
import Alert from '@/components/ui-elements/Alert.vue';
import BudgetEditSummary from '@/components/partials/BudgetEditSummary.vue';
import BudgetEditTable from '@/components/tables/BudgetEditTable.vue';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import ExpenseModal from '@/components/modals/ExpenseModal.vue';
import ExpenseSlideover from '@/components/slideovers/ExpenseSlideover.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import SideBar from '@/components/partials/SideBar.vue';
import {
	useAggregationStore,
	useBudgetStore,
	useTemplateStore,
	useTypesStore,
} from '@/store';
import { useRoute } from 'vue-router';
import { BudgetExpense, BudgetList } from '@/store/budget';
import useTimestamp from '@/hooks/useTimestamp';
import useRemoveExpense from '@/hooks/useRemoveExpense';

export default defineComponent({
	components: {
		Alert,
		BudgetEditSummary,
		BudgetEditTable,
		ConfirmationModal,
		ExpenseModal,
		ExpenseSlideover,
		SideBar,
		Select,
	},
	setup() {
		const aggregationStore = useAggregationStore();
		const budgetStore = useBudgetStore();
		const templateStore = useTemplateStore();
		const typeStore = useTypesStore();
		const {
			params: { id },
		} = useRoute();
		const { generateTempId } = useTimestamp();
		const {
			getRemoveExpenseList,
			removeExpense,
			resetList,
			setItemToBeRemoved,
		} = useRemoveExpense();

		const alert = reactive({
			hide: true,
			show: false,
			message: '',
			type: '',
		});
		const budget = ref({} as BudgetList);
		const disableSave = ref(true);
		const loading = ref(true);

		onMounted(async () => {
			await budgetStore.getBudget(id.toString());
			loading.value = false;
		});

		const expenseData = ref({});
		const selectedCategory = ref('banks');
		const categories = computed(() => typeStore.bills);
		const showConfirmModal = ref(false);
		const showModal = ref(false);

		const isLatestBudget = () =>
			budgetStore.list[0]?.id === budget.value.id;

		const updateBudgetTemplate = async () => {
			const data: { expenses: Record<string, any[]> } = {
				expenses: {
					banks: [],
				},
			};

			budget.value?.expenses?.banks.forEach(bank => {
				const templateObj = templateStore.expenses.banks.find(
					temp => temp.id === bank?.bank_template_id
				);

				if (templateObj) {
					data.expenses.banks.push({
						...templateObj,
						amount: bank.amount,
					});
				}
			});

			if (data.expenses.banks.length) {
				await templateStore.saveTemplate(data.expenses);
			}
		};

		const saveBudget = async () => {
			const removeList = getRemoveExpenseList();

			if (removeList.length) {
				await budgetStore.removeBudgetExpenses(
					budget.value.id as number,
					removeList
				);
			}

			const res = await budgetStore.updateBudget(budget.value);
			disableSave.value = true;

			if (res.success) {
				if (isLatestBudget()) {
					await aggregationStore.getUnpaidBillTotals();
					await updateBudgetTemplate();
				}

				await aggregationStore.getYearlyAggregations();
				alert.type = 'success';
				alert.message = 'Budget was saved successfully';
				resetList();
			} else {
				alert.type = 'error';
				alert.message = 'There was a problem saving the budget.';
				disableSave.value = false;
			}

			alert.hide = false;
			setTimeout(() => {
				alert.show = true;
				setTimeout(() => {
					alert.show = false;
					setTimeout(() => (alert.hide = true), 275);
				}, 6000);
			}, 75);
		};

		const confirmRemoveExpense = () => {
			const { save, expenses } = removeExpense(
				budget.value.expenses as Record<string, Array<BudgetExpense>>
			);
			budget.value.expenses = expenses;
			disableSave.value = !save;
		};

		const setDeleteAndShowConfirmation = (e: {
			id: string | number;
			category: string;
		}) => {
			setItemToBeRemoved(e);
			showConfirmModal.value = true;
		};

		const showExpenseModal = (e: BudgetExpense) => {
			if (e) {
				expenseData.value = e;
			}
			showModal.value = true;
		};

		const updateLocalBudget = (data: BudgetExpense) => {
			if (budget.value && budget.value.expenses) {
				disableSave.value = false;
				const index = budget.value.expenses[
					selectedCategory.value
				].findIndex(
					(expense: BudgetExpense) => expense.id === (data.id ?? -1)
				);

				if (index > -1) {
					// @todo compare new data with current to see if there was a change
					budget.value.expenses[selectedCategory.value][index] = data;
				} else {
					const result: BudgetExpense = {
						...data,
						id: generateTempId(),
						[typeStore.getTypeColumnNameFromType(
							selectedCategory.value
						)]: (data as any).type,
					};

					delete (result as any).type;
					budget.value.expenses[selectedCategory.value].push(result);
				}
			}
		};

		watch(showModal, n => {
			if (!n) {
				expenseData.value = {};
			}
		});

		watchEffect(() => {
			budget.value = JSON.parse(
				JSON.stringify(
					budgetStore.list.find(item => item.id === Number(id)) ??
						({} as BudgetList)
				)
			);
		});

		return {
			alert,
			categories,
			budget,
			confirmRemoveExpense,
			disableSave,
			expenseData,
			saveBudget,
			selectedCategory,
			setDeleteAndShowConfirmation,
			showConfirmModal,
			showExpenseModal,
			showModal,
			updateLocalBudget,
			loading,
		};
	},
});
</script>

<template>
	<ConfirmationModal
		title="Remove Expense"
		text="Are you sure you want to remove this expense?"
		v-model:show="showConfirmModal"
		@confirm="confirmRemoveExpense()"
	/>

	<ExpenseModal
		class="hidden lg:block"
		v-model:show="showModal"
		:data="expenseData"
		:type="selectedCategory"
		:hide-sidebar="!!Object.keys(expenseData).length"
		@update-budget="updateLocalBudget($event)"
	/>

	<ExpenseSlideover
		class="block lg:hidden"
		v-model:show="showModal"
		:data="expenseData"
		:type="selectedCategory"
		:hide-sidebar="!!Object.keys(expenseData).length"
		@update-budget="updateLocalBudget($event)"
	/>

	<BudgetEditSummary
		v-if="budget && budget.expenses"
		:date="budget.budget_cycle"
		:disable-save="disableSave"
		:expenses="budget.expenses"
		@add-expense="showModal = true"
		@save-budget="saveBudget()"
	/>

	<div class="container mx-auto py-6 px-4 sm:px-0 relative">
		<div
			class="absolute w-full top-0 left-0 transform transition duration-200 ease-in-out"
			:class="{
				'-translate-y-12 opacity-100': alert.show,
				'-translate-y-24 opacity-0': !alert.show,
			}"
			v-if="!alert.hide"
		>
			<Alert :type="alert.type" :message="alert.message" />
		</div>

		<Select
			class="block md:hidden"
			:items="categories"
			item-value="slug"
			item-label="name"
			v-model:value="selectedCategory"
		/>

		<div class="grid grid-cols-1 md:grid-cols-5 gap-3">
			<SideBar
				title="Categories"
				:items="categories"
				item-value="slug"
				item-label="name"
				v-model:selected-item="selectedCategory"
			/>

			<div class="col-span-4" v-if="!loading">
				<BudgetEditTable
					:category="selectedCategory"
					:data="budget.expenses"
					@show-expense-modal="showExpenseModal($event)"
					@show-remove-expense-modal="
						setDeleteAndShowConfirmation($event)
					"
				/>
			</div>
		</div>
	</div>
</template>
