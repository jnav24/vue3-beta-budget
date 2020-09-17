<script lang="ts">
import { defineComponent } from 'vue';
import BudgetEditTotal from '@/components/partials/BudgetEditTotal.vue';

export default defineComponent({
	components: {
		BudgetEditTotal,
	},
	setup() {
		const totals = [
			{ title: 'Total Earned', amount: '19,546.24', icon: '' },
			{ title: 'Total Spent', amount: '456.14', icon: '' },
			{ title: 'Total Invested', amount: '419,423.77', icon: '' },
			{ title: 'Total Banked', amount: '13,956.07', icon: '' },
		];

		return { totals };
	},
});
</script>

<template>
	<div class="bg-dark-primary w-full">
		<div class="container mx-auto py-8">
			<div class="flex flex-row justify-between items-center">
				<div class="space-y-0">
					<p class="text-gray-300 uppercase">Total Saved</p>
					<p class="text-4xl font-body font-bold text-primary">
						$19,456.24
					</p>
				</div>

				<div class="text-gray-300 text-xl">
					Aug. 2020
				</div>
			</div>
		</div>
	</div>

	<div class="container mx-auto">
		<div class="flex flex-row justify-between items-center mt-8">
			<BudgetEditTotal
				v-for="(total, index) in totals"
				:key="index"
				:amount="total.amount"
				:icon="total.icon"
				:title="total.title"
			/>
		</div>
	</div>
</template>
