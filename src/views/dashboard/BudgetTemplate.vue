<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue';
import BudgetTemplateTable from '@/components/tables/BudgetTemplateTable.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import ExpenseModal from '@/components/modals/ExpenseModal.vue';
import ExpenseSlideover from '@/components/slideovers/ExpenseSlideover.vue';
import SaveIcon from '@/components/ui-elements/icons/SaveIcon.vue';
import { useTemplateStore } from '@/store';
import { BudgetExpense } from '@/store/budget';

export default defineComponent({
	components: {
		BudgetTemplateTable,
		Button,
		ExpenseModal,
		ExpenseSlideover,
		SaveIcon,
	},
	setup() {
		const templateStore = useTemplateStore();

		const expenses = ref({});
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

		const updateLocalExpense = (data: BudgetExpense) => {
			console.log(data);
		};

		return {
			expenses,
			expenseData,
			openExpense,
			selectedCategory,
			showModal,
			updateLocalExpense,
		};
	},
});
</script>

<template>
	<ExpenseModal
		class="hidden lg:block"
		v-model:show="showModal"
		:data="expenseData"
		:type="selectedCategory"
		@update-budget="updateLocalExpense($event)"
	/>

	<ExpenseSlideover
		class="block lg:hidden"
		v-model:show="showModal"
		:data="expenseData"
		:type="selectedCategory"
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
				:is-disabled="true"
			>
				<SaveIcon class="w-5 h-5 mr-2" />
				<span>Save</span>
			</Button>
		</div>
	</div>

	<div class="container mx-auto">
		<BudgetTemplateTable
			v-for="(item, key) in expenses"
			:key="key"
			:category="key"
			:data="item"
			@add-expense="openExpense($event)"
		/>
	</div>
</template>
