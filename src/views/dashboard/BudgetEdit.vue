<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import BudgetEditSummary from '@/components/partials/BudgetEditSummary.vue';
import BudgetEditTable from '@/components/tables/BudgetEditTable.vue';
import ExpenseModal from '@/components/modals/ExpenseModal.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import SideBar from '@/components/partials/SideBar.vue';
import { useBudgetStore, useTypesStore } from '@/store';
import { useRoute } from 'vue-router';
import { BudgetExpense } from '@/store/budget';

export default defineComponent({
	components: {
		BudgetEditSummary,
		BudgetEditTable,
		ExpenseModal,
		SideBar,
		Select,
	},
	setup() {
		const budgetStore = useBudgetStore();
		const typeStore = useTypesStore();
		const {
			params: { id },
		} = useRoute();

		const budget = computed(() =>
			budgetStore.list.find(item => item.id === Number(id))
		);
		const loading = ref(true);

		onMounted(async () => {
			await budgetStore.getBudget(id.toString());
			loading.value = false;
		});

		const expenseData = ref({});
		const selectedCategory = ref('banks');
		const categories = computed(() => typeStore.bills);
		const showModal = ref(false);

		const showExpenseModal = (e: BudgetExpense) => {
			if (e) {
				expenseData.value = e;
			}
			showModal.value = true;
		};

		watch(showModal, n => {
			if (!n) {
				expenseData.value = {};
			}
		});

		return {
			categories,
			budget,
			expenseData,
			selectedCategory,
			showExpenseModal,
			showModal,
			loading,
		};
	},
});
</script>

<template>
	<ExpenseModal v-model:show="showModal" :data="expenseData" />

	<BudgetEditSummary
		v-if="budget && budget.expenses"
		:date="budget.budget_cycle"
		:expenses="budget.expenses"
		@add-expense="showModal = true"
	/>

	<div class="container mx-auto py-6 px-4 sm:px-0">
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
