<script lang="ts">
import { defineComponent } from 'vue';
import AddIcon from '@/components/ui-elements/icons/AddIcon.vue';
import BanIcon from '@/components/ui-elements/icons/BanIcon.vue';
import BudgetTableHeaders from '@/components/partials/BudgetTableHeaders.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import EditIcon from '@/components/ui-elements/icons/EditIcon.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';
import useBudgetTable from '@/hooks/useBudgetTable';
import useUtils from '@/hooks/useUtils';
import { BudgetExpense } from '@/store/budget';

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
		AddIcon,
		BanIcon,
		BudgetTableHeaders,
		Button,
		Card,
		CardContent,
		CardHeader,
		EditIcon,
		WarningIcon,
	},
	setup(props, { emit }) {
		const { getExpenseValue, getHeaders } = useBudgetTable();
		const { toTitleCase } = useUtils();
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
			incomes: ['name', 'amount', 'type', 'initial_pay_date', 'actions'],
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

		const removeExpense = (id: string | number) => {
			emit('show-remove-expense-modal', { id, category: props.category });
		};

		const setHeaderName = (name: string): string => {
			return name;
		};

		const addExpense = (data?: BudgetExpense) =>
			emit('add-expense', { category: props.category, expense: data });

		return {
			addExpense,
			toTitleCase,
			getExpenseValue,
			headers,
			removeExpense,
			setHeaderName,
			tableHeaders,
		};
	},
});
</script>

<template>
	<section class="mb-24 px-4 sm:px-0">
		<div class="mt-4 flex flex-row items-center justify-between">
			<h2 class="text-2xl text-gray-600 font-body">
				{{ toTitleCase(category) }}
			</h2>
			<Button color="secondary" @click="addExpense()">
				<AddIcon class="w-5 h-5 mr-2" />
				<span>Add</span>
			</Button>
		</div>

		<Card>
			<CardHeader class="bg-gray-100 rounded-t-md">
				<BudgetTableHeaders :headers="tableHeaders" />
			</CardHeader>

			<CardContent>
				<div
					v-if="!data.length"
					class="py-16 text-gray-500 flex flex-col items-center justify-center"
				>
					<WarningIcon class="w-8 h-8" />
					<span>{{ toTitleCase(category) }} is empty.</span>
				</div>

				<div
					v-for="item in data"
					:key="item.id"
					:class="
						`grid grid-cols-2 sm:grid-cols-${tableHeaders.length} gap-2 text-gray-700 py-4 even:bg-gray-100 items-center`
					"
				>
					<div
						class="col-span-1"
						:class="{
							'pl-2': index === 0,
							'hidden sm:block': ![
								'name',
								'actions',
								'vehicle',
							].includes(header),
						}"
						v-for="(header, index) in tableHeaders"
						:key="index"
					>
						<div v-if="header !== 'actions'">
							{{ getExpenseValue(header, item) }}
						</div>

						<div
							class="flex flex-row items-center"
							v-if="header === 'actions'"
						>
							<Button
								color="secondary"
								fab
								@on-click="addExpense(item)"
							>
								<EditIcon class="w-4 h-4" />
							</Button>

							<Button
								color="danger"
								fab
								@click="removeExpense(item.id)"
							>
								<BanIcon class="w-4 h-4 text-white" />
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</section>
</template>
