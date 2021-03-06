<script lang="ts">
import { computed, defineComponent } from 'vue';
import AddIcon from '@/components/ui-elements/icons/AddIcon.vue';
import BudgetEditTotal from '@/components/partials/BudgetEditTotal.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import SaveIcon from '@/components/ui-elements/icons/SaveIcon.vue';
import useTimestamp from '@/hooks/useTimestamp';
import useUtils from '@/hooks/useUtils';
import { BudgetExpense } from '@/store/budget';
import useCurrency from '@/hooks/useCurrency';

export default defineComponent({
	components: {
		AddIcon,
		BudgetEditTotal,
		Button,
		SaveIcon,
	},
	props: {
		date: {
			required: true,
			type: String,
		},
		disableSave: {
			default: true,
			type: Boolean,
		},
		expenses: {
			required: true,
			type: Object as () => Record<string, Array<BudgetExpense>>,
		},
	},
	setup(props, { emit }) {
		const { formatDollar } = useCurrency();
		const { formatDate } = useTimestamp();
		const { arrayColumn } = useUtils();
		const cycle = formatDate('MMM yyyy', props.date);

		const generateTotals = (list: Array<BudgetExpense>) => {
			const amounts = arrayColumn('amount', list as any);
			return formatDollar(
				amounts.reduce((acc, cir) => acc + Number(cir), 0)
			);
		};

		const totalBanked = computed(() =>
			generateTotals(props.expenses['banks'] ?? '0.00')
		);
		const totalEarned = computed(() =>
			generateTotals(props.expenses['incomes'] ?? '0.00')
		);
		const totalInvested = computed(() =>
			generateTotals(props.expenses['investments'] ?? '0.00')
		);
		const totalSpent = computed(() => {
			const spentList: Array<BudgetExpense> = [];
			Object.keys(props.expenses)
				.filter(
					type => !['banks', 'incomes', 'investments'].includes(type)
				)
				.forEach(key => {
					const list = props.expenses[key].filter(expense => {
						if (typeof expense.not_track_amount !== 'undefined') {
							return !expense.not_track_amount;
						}

						return true;
					});

					spentList.push(...list);
				});

			return generateTotals(spentList);
		});
		const totalSaved = computed(() => {
			return formatDollar(
				(
					Number(totalEarned.value.replace(',', '')) -
					Number(totalSpent.value.replace(',', ''))
				).toString()
			);
		});

		return {
			addExpense: () => emit('add-expense'),
			cycle,
			isGain: computed(() => !totalSaved.value.includes('-')),
			saveBudget: () => emit('save-budget'),
			totalBanked,
			totalEarned,
			totalInvested,
			totalSaved,
			totalSpent,
		};
	},
});
</script>

<template>
	<div
		class="w-full"
		:class="{ 'bg-dark-danger': !isGain, 'bg-dark-primary': isGain }"
	>
		<div class="container mx-auto py-8">
			<div
				class="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center px-4 sm:px-0"
			>
				<div class="space-y-0">
					<p class="text-gray-300 uppercase">
						<template v-if="isGain">Total Saved</template>
						<template v-if="!isGain">Total Loss</template>
					</p>
					<p
						class="text-4xl font-body font-bold"
						:class="{
							'text-danger': !isGain,
							'text-primary': isGain,
						}"
					>
						${{ totalSaved.replace('-', '') }}
					</p>
				</div>

				<div
					class="text-right flex flex-col sm:flex-row mt-6 sm:mt-0 items-start sm:items-center space-y-2 sm:space-y-0 w-full sm:w-auto"
				>
					<p class="text-gray-300 text-base sm:text-xl pr-4">
						{{ cycle }}
					</p>

					<Button
						color="secondary"
						class="w-full sm:w-auto"
						@on-click="addExpense()"
					>
						<AddIcon class="w-5 h-5" />
						<span class="ml-2">Add Expense</span>
					</Button>

					<Button
						color="primary"
						class="w-full sm:w-auto"
						:is-disabled="disableSave"
						@on-click="saveBudget()"
					>
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
				:amount="totalEarned"
				icon="CashIcon"
				title="Total Earned"
			/>

			<BudgetEditTotal
				class="justify-center md:justify-start"
				:amount="totalSpent"
				icon="ShoppingBagIcon"
				title="Total Spent"
			/>

			<BudgetEditTotal
				class="justify-center md:justify-start"
				:amount="totalInvested"
				icon="ReceiptTaxIcon"
				title="Total Invested"
			/>

			<BudgetEditTotal
				class="justify-center md:justify-start"
				:amount="totalBanked"
				icon="LibraryIcon"
				title="Total Banked"
			/>
		</div>
	</div>
</template>
