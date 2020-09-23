<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';

export default defineComponent({
	components: {
		Card,
		CardContent,
		CardHeader,
		WarningIcon,
	},
	setup() {
		const headers: Record<string, Array<string>> = {
			common: ['name', 'amount', 'type', 'due_date', 'actions'],
			'credit-cards': [
				'name',
				'type',
				'last_4',
				'exp_month',
				'exp_year',
				'apr',
				'limit',
				'due_date',
				'actions',
			],
			incomes: ['name', 'amount', 'type', 'initial_pay_date'],
			miscellaneous: ['name', 'amount', 'due_date', 'actions'],
			savings: ['name', 'amount', 'type', 'actions'],
			vehicles: [
				'vehicle',
				'type',
				'due_date',
				'mileage',
				'balance',
				'amount',
				'actions',
			],
		};

		const setHeaderName = (name: string): string => {
			return name;
		};

		const getExpenseValue = (
			header: string,
			item: Record<string, string>
		): string => {
			console.log(item);
			return header;
		};

		return { getExpenseValue, headers, setHeaderName };
	},
});
</script>

<template>
	<Card>
		<CardHeader class="bg-gray-100">
			header baby
		</CardHeader>

		<CardContent>
			<div
				class="py-32 text-gray-500 flex flex-col items-center justify-center"
			>
				<WarningIcon class="w-8 h-8" />
				<span>[enter expression] is empty.</span>
			</div>
		</CardContent>
	</Card>
</template>
