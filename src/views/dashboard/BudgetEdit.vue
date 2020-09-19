<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
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
		const headers: Record<string, Array<string>> = {
			common: [
				'',
				'name',
				'type',
				'amount',
				'due date/paid date',
				'actions',
			],
			'credit-cards': [
				'',
				'name',
				'type',
				'amount',
				'balance',
				'limit',
				'due date/paid date',
				'actions',
			],
			income: ['name', 'type', 'amount', 'paid date', 'actions'],
			miscellaneous: [
				'',
				'name',
				'amount',
				'due date/paid date',
				'actions',
			],
			savings: ['name', 'type', 'amount', 'actions'],
			vehicles: [
				'',
				'name',
				'type',
				'amount',
				'balance',
				'due date/paid date',
				'actions',
			],
		};

		const categoryHeader = computed(() => {
			const categoryMap: Record<string, string> = {
				banks: 'savings',
				investments: 'savings',
			};

			if (headers[selectedCategory.value]) {
				return headers[selectedCategory.value];
			}

			if (
				!headers[selectedCategory.value] &&
				categoryMap[selectedCategory.value]
			) {
				return headers[categoryMap[selectedCategory.value]];
			}

			return headers.common;
		});

		return { categories, categoryHeader, selectedCategory };
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
					<div
						:class="`grid gap-2 grid-cols-${categoryHeader.length}`"
					>
						<div
							v-for="(header, index) in categoryHeader"
							:key="index"
						>
							{{ header }}
						</div>
					</div>
				</CardHeader>

				<CardContent>
					content...
				</CardContent>
			</Card>
		</div>
	</div>
</template>
