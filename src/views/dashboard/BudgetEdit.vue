<script lang="ts">
import { defineComponent, ref } from 'vue';
import BudgetEditSummary from '@/components/partials/BudgetEditSummary.vue';
import BudgetEditTable from '@/components/tables/BudgetEditTable.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import SideBar from '@/components/partials/SideBar.vue';

export default defineComponent({
	components: {
		BudgetEditSummary,
		BudgetEditTable,
		SideBar,
		Select,
	},
	setup() {
		const selectedCategory = ref('banks');
		const categories = [
			{ label: 'Banks', value: 'banks' },
			{ label: 'Credit Cards', value: 'credit-cards' },
			{ label: 'Investments', value: 'investments' },
		];
		const expenses = {
			banks: [
				{
					id: 150,
					name: 'Wells Fargo',
					amount: '5250.35',
					'bank_type_id': 1,
					'bank_template_id': 31
				},
				{
					id: 150,
					name: 'Wells Fargo',
					amount: '5250.35',
					'bank_type_id': 1,
					'bank_template_id': 31
				},
			],
			'credit-cards': [
				{
					id: 141,
					name: 'Delta',
					limit: '30400',
					'last_4': '',
					'exp_month': '0',
					'exp_year': '0',
					apr: '19.49',
					'due_date': 9,
					'credit_card_type_id': 4,
					'paid_date': '2020-02-08 00:00:00',
					confirmation: 'W7068',
					amount: '200',
					balance: '2136.05',
				},
			],
			investments: [],
		};

		return { categories, expenses, selectedCategory };
	},
});
</script>

<template>
	<BudgetEditSummary />

	<div class="container mx-auto py-6 px-4 sm:px-0">
		<Select class="block md:hidden" :items="categories" v-model:value="selectedCategory" />
		<div class="grid grid-cols-1 md:grid-cols-5 gap-3">
			<SideBar
				title="Categories"
				:items="categories"
				v-model:selected-item="selectedCategory"
			/>

			<div class="col-span-4">
				<BudgetEditTable
					:category="selectedCategory"
					:data="expenses"
				/>
			</div>
		</div>
	</div>
</template>
