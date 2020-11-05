<script lang="ts">
import { computed, defineComponent } from 'vue';
import BanIcon from '@/components/ui-elements/icons/BanIcon.vue';
import BudgetTableHeaders from '@/components/partials/BudgetTableHeaders.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import CheckIcon from '@/components/ui-elements/icons/CheckIcon.vue';
import EditIcon from '@/components/ui-elements/icons/EditIcon.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';
import useBudgetTable from '@/hooks/useBudgetTable';
import useCurrency from '@/hooks/useCurrency';
import useTimestamp from '@/hooks/useTimestamp';
import useUtils from '@/hooks/useUtils';
import { useUserStore, useTypesStore } from '@/store';
import { BudgetExpense } from '@/store/budget';

type ExpenseType = {
	name: string;
	type: string;
	amount: string;
	balance: string;
	paid_date: string;
};

export default defineComponent({
	components: {
		BanIcon,
		BudgetTableHeaders,
		Button,
		Card,
		CardHeader,
		CardContent,
		CheckIcon,
		EditIcon,
		WarningIcon,
	},
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
	setup(props, { emit }) {
		const { getHeaders } = useBudgetTable();
		const { ucFirst } = useUtils();
		const { formatDollar } = useCurrency();
		const { formatTimeZone } = useTimestamp();
		const userStore = useUserStore();
		const typesStore = useTypesStore();
		const headers: Record<string, Array<string>> = {
			common: ['', 'name', 'type', 'amount', 'paid_date', 'actions'],
			'credit-cards': [
				'',
				'name',
				'type',
				'amount',
				'balance',
				'paid_date',
				'actions',
			],
			incomes: ['name', 'type', 'amount', 'date', 'actions'],
			miscellaneous: ['', 'name', 'amount', 'paid_date', 'actions'],
			savings: ['name', 'type', 'amount', 'actions'],
			vehicles: [
				'',
				'name',
				'type',
				'amount',
				'balance',
				'paid_date',
				'actions',
			],
		};

		const categoryHeader = computed(() =>
			getHeaders(props.category, headers)
		);

		const getExpenseValue = <T extends BudgetExpense>(
			header: string,
			item: T
		): string | null => {
			const dateFormat = 'MMM d';
			if (['amount', 'balance'].includes(header as string)) {
				return `$${formatDollar((item as any)[header])}`;
			}

			if (header === 'name' && item.user_vehicle_id) {
				const vehicle = userStore.getVehicleName(item.user_vehicle_id);
				return vehicle
					? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
					: '';
			}

			if ((item as any)[header]) {
				if (header === 'paid_date') {
					return formatTimeZone(dateFormat, 'UTC', item['paid_date']);
				}

				return (item as any)[header];
			}

			if (header === 'type') {
				const typeObj = typesStore.getType(item);
				return typeObj?.name ?? null;
			}

			if (header === 'date') {
				if (item['initial_pay_date']) {
					return formatTimeZone(
						dateFormat,
						'UTC',
						item['initial_pay_date']
					);
				}
			}

			return '';
		};

		const showExpenseModal = (item: BudgetExpense) => {
			emit('show-expense-modal', item);
		};

		return { categoryHeader, getExpenseValue, showExpenseModal, ucFirst };
	},
});
</script>

<template>
	<Card>
		<CardHeader class="bg-gray-100">
			<BudgetTableHeaders :headers="categoryHeader" />
		</CardHeader>

		<CardContent>
			<div
				v-if="!data[category].length"
				class="py-8 text-gray-500 flex flex-col items-center justify-center"
			>
				<WarningIcon class="w-8 h-8" />
				<span>{{ ucFirst(category) }} is empty.</span>
			</div>

			<div
				:class="
					`grid grid-cols-2 sm:grid-cols-${categoryHeader.length} gap-2 text-gray-700 py-4 even:bg-gray-100 items-center text-sm`
				"
				v-for="item in data[category]"
				:key="item.id"
			>
				<div
					class="col-span-1"
					:class="{
						'pl-2': index === 0,
						'hidden sm:block': !['name', 'actions'].includes(
							header
						),
					}"
					v-for="(header, index) in categoryHeader"
					:key="index"
				>
					<template v-if="!header.trim().length">
						<div
							class="rounded-full p-2 bg-primary w-8 mr-2"
							v-if="item.confirmation"
						>
							<CheckIcon class="w-4 h-4 text-white" />
						</div>
					</template>

					<div
						class="flex flex-row items-center"
						v-if="header === 'actions'"
					>
						<Button
							color="secondary"
							fab
							@on-click="showExpenseModal(item)"
						>
							<EditIcon class="w-4 h-4" />
						</Button>

						<Button color="danger" fab>
							<BanIcon class="w-4 h-4 text-white" />
						</Button>
					</div>

					<div
						class="truncate"
						v-if="header !== 'actions' && header.trim().length"
					>
						{{ getExpenseValue(header, item) }}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
</template>
