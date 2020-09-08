<script lang="ts">
import { defineComponent } from 'vue';
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
	},
	setup() {
		const form = {
			year: {
				rules: {},
				value: '19',
			},
		};

		const items = [
			{ value: '20', label: '2020' },
			{ value: '19', label: '2019' },
		];

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

		return { form, items, summary };
	},
});
</script>

<template>
	<div class="container mx-auto py-6">
		<Alert type="warn" message="You have 19 unpaid bills"></Alert>

		<Card class="mx-2 sm:mx-0">
			<CardHeader>
				<div class="flex flex-col sm:flex-row justify-between">
					<h1
						class="font-header text-dark-primary text-xl sm:text-2xl mb-2 sm:mb-0 ml-2"
					>
						Yearly Overview
					</h1>
					<Select v-model:value="form.year.value" :items="items" />
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
						<DonutChart />
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<h2 class="text-gray-700 text-lg">Activity</h2>
				</CardHeader>

				<CardContent>
					Percentage of amount earned/spent
				</CardContent>
			</Card>
		</div>
	</div>
</template>
