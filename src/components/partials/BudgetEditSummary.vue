<script lang="ts">
import { defineComponent, ref } from 'vue';
import AddIcon from '@/components/ui-elements/icons/AddIcon.vue';
import BudgetEditTotal from '@/components/partials/BudgetEditTotal.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import SaveIcon from '@/components/ui-elements/icons/SaveIcon.vue';

export default defineComponent({
	components: {
		AddIcon,
		BudgetEditTotal,
		Button,
		SaveIcon,
	},
	setup() {
		const disableSave = ref(true);
		const totals = [
			{ title: 'Total Earned', amount: '19,546.24', icon: 'CashIcon' },
			{ title: 'Total Spent', amount: '456.14', icon: 'ShoppingBagIcon' },
			{
				title: 'Total Invested',
				amount: '419,423.77',
				icon: 'ReceiptTaxIcon',
			},
			{ title: 'Total Banked', amount: '13,956.07', icon: 'LibraryIcon' },
		];

		return { disableSave, totals };
	},
});
</script>

<template>
	<div class="bg-dark-primary w-full">
		<div class="container mx-auto py-8">
			<div class="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center px-4 sm:px-0">
				<div class="space-y-0">
					<p class="text-gray-300 uppercase">
						<!-- @todo say `Total Loss` on negative -->
						Total Saved
					</p>
					<p class="text-4xl font-body font-bold text-primary">
						$19,456.24
					</p>
				</div>

				<div class="text-right flex flex-col sm:flex-row mt-6 sm:mt-0 items-start sm:items-center space-y-2 sm:space-y-0 w-full sm:w-auto">
					<p class="text-gray-300 text-base sm:text-xl pr-4">Aug. 2020</p>

					<Button color="secondary" class="w-full sm:w-auto">
						<AddIcon class="w-5 h-5" />
						<span class="ml-2">Add Expense</span>
					</Button>

					<Button color="primary" class="w-full sm:w-auto" :is-disabled="disableSave">
						<SaveIcon class="w-5 h-5" />
						<span class="ml-2">Save</span>
					</Button>
				</div>
			</div>
		</div>
	</div>

	<div class="container mx-auto hidden sm:block">
		<div
			class="grid grid-cols-2 gap-6 md:flex md:flex-row md:justify-between items-center mt-8"
		>
			<BudgetEditTotal
				class="justify-center md:justify-start"
				v-for="(total, index) in totals"
				:key="index"
				:amount="total.amount"
				:icon="total.icon"
				:title="total.title"
			/>
		</div>
	</div>
</template>
