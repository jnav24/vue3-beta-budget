<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import BudgetEditSummary from '@/components/partials/BudgetEditSummary.vue';
import BudgetEditTable from '@/components/tables/BudgetEditTable.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import SideBar from '@/components/partials/SideBar.vue';
import { useBudgetStore } from '@/store/budget';
import { useRoute } from 'vue-router';

export default defineComponent({
	components: {
		BudgetEditSummary,
		BudgetEditTable,
		SideBar,
		Select,
	},
	setup() {
		const budgetStore = useBudgetStore();
		const {
			params: { id },
		} = useRoute();

		const budget = ref({});
		const loading = ref(true);

		onMounted(async () => {
			budget.value = await budgetStore.getBudget(id.toString());
			loading.value = false;
		});

		const selectedCategory = ref('banks');
		const categories = [
			{ label: 'Banks', value: 'banks' },
			{ label: 'Credit Cards', value: 'credit-cards' },
			{ label: 'Investments', value: 'investments' },
		];

		return { categories, budget, selectedCategory, loading };
	},
});
</script>

<template>
	<BudgetEditSummary />

	<div class="container mx-auto py-6 px-4 sm:px-0">
		<Select
			class="block md:hidden"
			:items="categories"
			v-model:value="selectedCategory"
		/>
		<div class="grid grid-cols-1 md:grid-cols-5 gap-3">
			<SideBar
				title="Categories"
				:items="categories"
				v-model:selected-item="selectedCategory"
			/>

			<div class="col-span-4" v-if="!loading">
				<BudgetEditTable
					:category="selectedCategory"
					:data="budget.expenses"
				/>
			</div>
		</div>
	</div>
</template>
