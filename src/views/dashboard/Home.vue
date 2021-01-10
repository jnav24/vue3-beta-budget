<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue';
import Alert from '@/components/ui-elements/Alert.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import DonutChart from '@/components/charts/DonutChart.vue';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart.vue';
import LineChart from '@/components/charts/LineChart.vue';
import BarChart from '@/components/charts/BarChart.vue';
import SummaryCard from '@/components/partials/SummaryCard.vue';
import YTDSummary from '@/components/partials/YTDSummary.vue';
import { useAggregationStore } from '@/store';
import { ChartDataSets } from 'chart.js';
import useTimestamp from '@/hooks/useTimestamp';
import useCurrency from '@/hooks/useCurrency';

export default defineComponent({
	components: {
		Alert,
		Card,
		CardContent,
		CardHeader,
		DonutChart,
		HorizontalBarChart,
		LineChart,
		BarChart,
		Select,
		SummaryCard,
		YTDSummary,
	},
	setup() {
		const aggregationStore = useAggregationStore();
		const { formatDate } = useTimestamp();
		const { formatDollar, getYtd } = useCurrency();

		const averageEarned = ref('0.00');
		const averageSaved = ref('0.00');
		const averageSpent = ref('0.00');
		const savedYtd = ref(0);
		const spentYtd = ref(0);
		const totalEarned = ref('0.00');
		const totalSaved = ref('0.00');
		const totalSpent = ref('0.00');
		const form = reactive({
			year: {
				rules: {},
				value: '',
			},
		});
		const years = computed(() => {
			const allYears = aggregationStore.allYears;

			if (form.year.value === '' && allYears.length) {
				form.year.value = allYears[0].value;
			}

			return allYears;
		});

		const chartData = computed(() => {
			const data: {
				labels: string[];
				datasets: ChartDataSets[];
			} = {
				labels: [],
				datasets: [],
			};
			const selectedYear = aggregationStore.budget[form.year.value];
			const months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			];

			if (selectedYear && selectedYear.earned && selectedYear.spent) {
				data.labels = months.splice(0, selectedYear.earned.length);
				data.datasets = [
					{
						label: 'Earned',
						backgroundColor: 'rgba(68,173,168,0.7)',
						data: selectedYear.earned as any,
					},
					{
						label: 'Spent',
						backgroundColor: 'rgba(198,40,40,0.5)',
						data: selectedYear.spent as any,
					},
				];
			}

			return data;
		});

		const yearlyExpenseData = {
			labels: [
				'Childcare',
				'Educational',
				'Entertainment',
				'Food',
				'Gift',
				'Housing',
				'Investments',
				'Medical',
				'Miscellaneous',
				'Personal',
				'Subscriptions',
				'Shopping',
				'Tax',
				'Travel',
				'Vehicles',
			],
			datasets: [
				{
					label: 'Spent',
					backgroundColor: [
						'#C62828',
						'#FBD38D',
						'#FAF089',
						'#38A169',
						'#4299E1',
						'#D53F8C',
						'#B794F4',
						'#E53E3E',
						'#2B6CB0',
						'#81E6D9',
						'#9AE6B4',
						'#FC8181',
						'#D6BCFA',
						'#ECC94B',
						'#FBB6CE',
					],
					data: [
						40,
						39,
						20,
						40,
						39,
						80,
						40,
						120,
						95,
						84,
						163,
						24,
						36,
						88,
						69,
					],
				},
			],
		};

		const getAverage = (amount: number) => {
			return amount / Number(formatDate('M'));
		};

		const getTotals = (priceList: string[]) => {
			return priceList.reduce((acc, cur) => {
				return acc + Number(cur);
			}, 0);
		};

		watchEffect(() => {
			const currentBudget = aggregationStore.budget[form.year.value];

			if (currentBudget) {
				const earned = getTotals(currentBudget.earned);
				const saved = getTotals(currentBudget.saved);
				const spent = getTotals(currentBudget.spent);

				savedYtd.value = getYtd(
					currentBudget.saved[0],
					currentBudget.saved[currentBudget.saved.length - 1]
				);
				spentYtd.value = getYtd(
					currentBudget.spent[0],
					currentBudget.spent[currentBudget.spent.length - 1]
				);
				totalEarned.value = formatDollar(earned);
				totalSaved.value = formatDollar(saved);
				totalSpent.value = formatDollar(spent);
				averageEarned.value = formatDollar(getAverage(earned));
				averageSaved.value = formatDollar(getAverage(saved));
				averageSpent.value = formatDollar(getAverage(spent));
			}
		});

		return {
			averageEarned,
			averageSaved,
			averageSpent,
			chartData,
			form,
			savedYtd,
			spentYtd,
			totalEarned,
			totalSaved,
			totalSpent,
			totalUnpaid: computed(() => aggregationStore.totalUnpaid),
			yearlyExpenseData,
			years,
		};
	},
});
</script>

<template>
	<div class="container mx-auto py-6">
		<Alert
			v-if="totalUnpaid"
			type="warn"
			:message="`You have ${totalUnpaid} unpaid bills`"
		/>

		<Card class="mx-2 sm:mx-0">
			<CardHeader>
				<div class="flex flex-col sm:flex-row justify-between">
					<h1
						class="font-header text-dark-primary text-xl sm:text-2xl mb-2 sm:mb-0 ml-2"
					>
						Yearly Overview
					</h1>
					<Select
						class="w-40 mr-3"
						v-model:value="form.year.value"
						:items="years"
					/>
				</div>
			</CardHeader>

			<CardContent>
				<div class="hidden sm:block">
					<LineChart
						:labels="chartData.labels"
						:data="chartData.datasets"
					/>
				</div>

				<div class="block sm:hidden">
					<BarChart
						:labels="chartData.labels"
						:data="chartData.datasets"
					/>
				</div>
			</CardContent>
		</Card>

		<div class="grid grid-cols-1 px-2 sm:grid-cols-3 sm:gap-6 sm:px-0">
			<SummaryCard
				:amount="`$${totalSaved}`"
				:average="`$${averageSaved}`"
				color="text-primary"
				icon="DollarIcon"
				:title="`Total Saved ${form.year.value}`"
			/>

			<SummaryCard
				:amount="`$${totalEarned}`"
				:average="`$${averageEarned}`"
				color="text-secondary"
				icon="TrendUpIcon"
				:title="`Total Earned ${form.year.value}`"
			/>

			<SummaryCard
				:amount="`$${totalSpent}`"
				:average="`$${averageSpent}`"
				color="text-danger"
				icon="TrendDownIcon"
				:title="`Total Spent ${form.year.value}`"
			/>
		</div>

		<div class="grid grid-cols-1 px-2 sm:grid-cols-3 sm:gap-6 sm:px-0">
			<Card class="col-span-2">
				<CardHeader>
					<h2 class="text-gray-700 text-lg">Spending Habits 2020</h2>
				</CardHeader>

				<CardContent>
					<div class="hidden md:block">
						<HorizontalBarChart />
					</div>

					<div class="block md:hidden">
						<DonutChart :data="yearlyExpenseData" />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<h2 class="text-gray-700 text-lg">Activity</h2>
				</CardHeader>

				<CardContent>
					<div class="flex flex-col justify-center items-center">
						<YTDSummary
							color="#45ADA8"
							:percentage="savedYtd"
							text="Saved since the beginning of the year."
						/>
						<YTDSummary
							color="#C62828"
							:percentage="spentYtd"
							text="Spent since the beginning of the year."
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</template>
