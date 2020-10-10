<script lang="ts">
import { computed, defineComponent } from 'vue';
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

		const form = {
			year: {
				rules: {},
				value: '2019',
			},
		};

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

		const summary = [
			{
				icon: 'DollarIcon',
				title: 'Total Saved 2020',
				amount: '$300,378.60',
				average: '$12,547.32',
				color: 'text-primary',
			},
			{
				icon: 'TrendUpIcon',
				title: 'Total Earned 2020',
				amount: '$376,530.63',
				average: '$22,066.32',
				color: 'text-secondary',
			},
			{
				icon: 'TrendDownIcon',
				title: 'Total Spent 2020',
				amount: '$76,152.03',
				average: '$22,066.32',
				color: 'text-danger',
			},
		];

		return {
			form,
			summary,
			totalUnpaid: computed(() => aggregationStore.totalUnpaid),
			yearlyExpenseData,
			years: computed(() => aggregationStore.allYears),
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
					<LineChart />
				</div>

				<div class="block sm:hidden">
					<BarChart />
				</div>
			</CardContent>
		</Card>

		<div class="grid grid-cols-1 px-2 sm:grid-cols-3 sm:gap-6 sm:px-0">
			<SummaryCard
				v-for="(item, index) in summary"
				:amount="item.amount"
				:average="item.average"
				:color="item.color"
				:icon="item.icon"
				:key="index"
				:title="item.title"
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
							percentage="40"
							text="Saved since the beginning of the year."
						/>
						<YTDSummary
							color="#45ADA8"
							percentage="65"
							text="Spent since the beginning of the year."
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</template>
