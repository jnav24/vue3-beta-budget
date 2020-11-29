<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect } from 'vue';
import Alert from '@/components/ui-elements/Alert.vue';
import BudgetTemplateTable from '@/components/tables/BudgetTemplateTable.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import ExpenseModal from '@/components/modals/ExpenseModal.vue';
import ExpenseSlideover from '@/components/slideovers/ExpenseSlideover.vue';
import SaveIcon from '@/components/ui-elements/icons/SaveIcon.vue';
import { useTemplateStore, useTypesStore } from '@/store';
import useTimestamp from '@/hooks/useTimestamp';
import { BudgetExpense } from '@/store/budget';
import useRemoveExpense from '@/hooks/useRemoveExpense';

export default defineComponent({
	components: {
		Alert,
		BudgetTemplateTable,
		Button,
		ConfirmationModal,
		ExpenseModal,
		ExpenseSlideover,
		SaveIcon,
	},
	setup() {
		const { generateTempId } = useTimestamp();
		const templateStore = useTemplateStore();
		const typeStore = useTypesStore();
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
		const showConfirmModal = ref(false);
		const disableSave = ref(true);
		const expenses = ref<Record<string, BudgetExpense[]>>(
			{} as Record<string, BudgetExpense[]>
		);
		const expenseData = ref({});
		const selectedCategory = ref('');
		const showModal = ref(false);

		watch(showModal, n => {
			if (!n) {
				expenseData.value = {};
			}
		});

		watchEffect(() => {
			expenses.value = JSON.parse(JSON.stringify(templateStore.expenses));
		});

		const confirmRemoveExpense = () => {
			const data = removeExpense(
				expenses.value as Record<string, Array<BudgetExpense>>
			);
			expenses.value = data.expenses;
			disableSave.value = !data.save;
		};

		const openExpense = (data: {
			category: string;
			expense?: BudgetExpense;
		}) => {
			if (data.expense) {
				expenseData.value = data.expense;
			}
			selectedCategory.value = data.category;
			showModal.value = true;
		};

		const saveBudgetTemplate = async () => {
			disableSave.value = true;
			await templateStore.removeExpense(getRemoveExpenseList());
			const response = await templateStore.saveTemplate(expenses.value);

			if (response.success) {
				alert.type = 'success';
				alert.message = 'Template was saved successfully';
				resetList();
			} else {
				alert.type = 'danger';
				alert.message = 'There was a problem saving the template.';
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

		const setDeleteAndShowConfirmation = (e: {
			id: string | number;
			category: string;
		}) => {
			setItemToBeRemoved(e);
			showConfirmModal.value = true;
		};

		const updateLocalExpense = (data: BudgetExpense) => {
			const index = expenses.value[selectedCategory.value].findIndex(
				(expense: BudgetExpense) => expense.id === (data.id ?? -1)
			);
			disableSave.value = false;

			if (index > -1) {
				expenses.value[selectedCategory.value][index] = data;
			} else {
				const result: BudgetExpense = {
					...data,
					id: generateTempId(),
					[typeStore.getTypeColumnNameFromType(
						selectedCategory.value
					)]: (data as any).type,
				};

				delete (result as any).type;
				expenses.value[selectedCategory.value].push(result);
			}
		};

		return {
			alert,
			confirmRemoveExpense,
			disableSave,
			expenses,
			expenseData,
			openExpense,
			saveBudgetTemplate,
			selectedCategory,
			setDeleteAndShowConfirmation,
			showConfirmModal,
			showModal,
			updateLocalExpense,
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
		hide-sidebar
		@update-budget="updateLocalExpense($event)"
	/>

	<ExpenseSlideover
		class="block lg:hidden"
		v-model:show="showModal"
		:data="expenseData"
		:type="selectedCategory"
		hide-sidebar
		@update-budget="updateLocalExpense($event)"
	/>

	<div class="w-full bg-gray-700">
		<div
			class="container mx-auto flex flex-col sm:flex-row justify-between items-center text-3xl border-b border-gray-400 mb-20 py-12 px-4 sm:px-0"
		>
			<div class="space-y-2 mr-0 sm:mr-64 mb-8 sm:mb-0">
				<h1 class="font-body text-white">Budget Template</h1>
				<p class="text-base font-header text-gray-500">
					Add all your monthly expenses here! Whenever you create a
					new budget, the expenses here will automatically show in
					your new monthly budget. The idea is to not to manually
					enter the same info more than once.
				</p>
				<p class="text-base font-header text-gray-500">
					All you have to do is click on the 'Add Expense' button,
					select the type of expense, enter the details and save your
					changes.
				</p>
				<p class="text-base font-header text-gray-500">
					If you were to delete an item on this page, all already
					existing budgets will be unaffected.
				</p>
			</div>
			<Button
				color="primary"
				class="w-full sm:w-auto"
				:is-disabled="disableSave"
				@click="saveBudgetTemplate()"
			>
				<SaveIcon class="w-5 h-5 mr-2" />
				<span>Save</span>
			</Button>
		</div>
	</div>

	<div class="container mx-auto relative">
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

		<BudgetTemplateTable
			v-for="(item, key) in expenses"
			:key="key"
			:category="key"
			:data="item"
			@add-expense="openExpense($event)"
			@show-remove-expense-modal="setDeleteAndShowConfirmation($event)"
		/>
	</div>
</template>
