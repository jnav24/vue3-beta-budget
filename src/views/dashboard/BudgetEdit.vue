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
import ExpenseModal from '@/components/modals/ExpenseModal.vue';
import ExpenseSlideover from '@/components/slideovers/ExpenseSlideover.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import SideBar from '@/components/partials/SideBar.vue';
import { useBudgetStore, useTypesStore } from '@/store';
import { useRoute } from 'vue-router';
import { BudgetExpense, BudgetList } from '@/store/budget';

export default defineComponent({
	components: {
		Alert,
		BudgetEditSummary,
		BudgetEditTable,
		ExpenseModal,
		ExpenseSlideover,
		SideBar,
		Select,
	},
	setup() {
		const budgetStore = useBudgetStore();
		const typeStore = useTypesStore();
		const {
			params: { id },
		} = useRoute();

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
		const showModal = ref(false);

		const saveBudget = async () => {
			const res = await budgetStore.updateBudget(budget.value);
			disableSave.value = true;

			if (res.success) {
				alert.type = 'success';
				alert.message = 'Budget was saved successfully';
			} else {
				alert.type = 'danger';
				alert.message = 'There was a problem saving the budget.';
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

		const showExpenseModal = (e: BudgetExpense) => {
			if (e) {
				expenseData.value = e;
			}
			showModal.value = true;
		};

		const updateLocalBudget = (data: BudgetExpense) => {
			let index = -1;

			if (budget.value && budget.value.expenses) {
				index = budget.value.expenses[selectedCategory.value].findIndex(
					(expense: BudgetExpense) => expense.id === data.id
				);

				if (index > -1) {
					// @todo compare new data with current to see if there was a change
					budget.value.expenses[selectedCategory.value][index] = data;
					disableSave.value = false;
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
			disableSave,
			expenseData,
			saveBudget,
			selectedCategory,
			showExpenseModal,
			showModal,
			updateLocalBudget,
			loading,
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
			<Alert
				type="success"
				message="Budget has been saved successfully"
			/>
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
				/>
			</div>
		</div>
	</div>
</template>
