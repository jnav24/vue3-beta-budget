<script lang="ts">
import { defineComponent, ref } from 'vue';
import BudgetEditSummary from '@/components/partials/BudgetEditSummary.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import SideBar from '@/components/partials/SideBar.vue';

export default defineComponent({
	components: {
		BudgetEditSummary,
		Card,
		CardContent,
		CardHeader,
		SideBar,
	},
	setup() {
		const selectedCategory = ref('banks');
		const categories = [
			{ label: 'Banks', value: 'banks' },
			{ label: 'Credit Cards', value: 'credit-cards' },
			{ label: 'Investments', value: 'investments' },
		];

		return { categories, selectedCategory };
	},
});
</script>

<template>
	<BudgetEditSummary />

	<div class="container mx-auto py-6">
		<div class="grid grid-cols-4 gap-3">
			<SideBar
				title="Categories"
				:items="categories"
				v-model:selected-item="selectedCategory"
			/>

			<Card class="col-span-3">
				<CardHeader class="bg-gray-100">
					Header
				</CardHeader>

				<CardContent>
					content...
				</CardContent>
			</Card>
		</div>
	</div>
</template>
