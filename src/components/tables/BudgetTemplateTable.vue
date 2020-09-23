<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';
import useBudgetTable from '@/hooks/useBudgetTable';
import useUtils from '@/hooks/useUtils';

type ExpenseType = {
	name: string;
	type: string;
	amount: string;
	balance: string;
	paid_date: string;
};

export default defineComponent({
	props: {
		category: {
			required: true,
			type: String,
		},
		data: {
			required: true,
			type: Array as () => Partial<ExpenseType>,
		},
	},
	components: {
		Button,
		Card,
		CardContent,
		CardHeader,
		WarningIcon,
	},
	setup(props) {
		const { getHeaders } = useBudgetTable();
		const { ucFirst } = useUtils();
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

		const tableHeaders = getHeaders(props.category, headers);

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

		return {
			getExpenseValue,
			headers,
			setHeaderName,
			tableHeaders,
			ucFirst,
		};
	},
});
</script>

<template>
	<section class="mb-16">
		<div class="mt-4 flex flex-row items-center justify-between">
			<h2 class="text-3xl text-gray-600 font-body">
				{{ ucFirst(category) }}
			</h2>
			<Button>Add</Button>
		</div>

		<Card>
			<CardHeader class="bg-gray-100">
				<div
					:class="
						`grid gap-2 grid-cols-2 sm:grid-cols-${tableHeaders.length}`
					"
				>
					<div
						v-for="(header, index) in tableHeaders"
						:key="index"
						:class="{
							'pl-2': index === 0,
							'hidden sm:block': !['name', 'actions'].includes(
								header
							),
						}"
					>
						{{ header }}
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<div
					class="py-32 text-gray-500 flex flex-col items-center justify-center"
				>
					<WarningIcon class="w-8 h-8" />
					<span>{{ ucFirst(category) }} is empty.</span>
				</div>
			</CardContent>
		</Card>
	</section>
</template>
