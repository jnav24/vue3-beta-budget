<script lang="ts">
import { defineComponent } from 'vue';
import BudgetTemplateTable from '@/components/tables/BudgetTemplateTable.vue';

export default defineComponent({
	components: {
		BudgetTemplateTable,
	},
	setup() {
		const expenses = {
			banks: [
				{
					id: 150,
					name: 'Wells Fargo',
					amount: '245250.35',
					bank_type_id: 1,
					bank_template_id: 31,
				},
				{
					id: 150,
					name: 'Wells Fargo',
					amount: '245250.35',
					bank_type_id: 1,
					bank_template_id: 31,
				},
			],
			'credit-cards': [
				{
					id: 141,
					name: 'Delta',
					limit: '3400',
					last_4: '',
					exp_month: '0',
					exp_year: '0',
					apr: '19.49',
					due_date: 9,
					credit_card_type_id: 4,
					paid_date: '2020-02-08 00:00:00',
					confirmation: 'WXYZ',
					amount: '200',
					balance: '2136.05',
				},
			],
			investments: [],
		};

		return { expenses };
	},
});
</script>

<template>
	<div class="container mx-auto">
		<BudgetTemplateTable
			v-for="(item, key) in expenses"
			:key="key"
			:category="key"
			:data="item"
		/>
	</div>
</template>
