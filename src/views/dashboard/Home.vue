<script lang="ts">
import { defineComponent } from 'vue';
import Alert from '@/components/ui-elements/Alert.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import DollarIcon from '@/components/ui-elements/icons/DollarIcon.vue';
import TrendDownIcon from '@/components/ui-elements/icons/TrendDownIcon.vue';
import TrendUpIcon from '@/components/ui-elements/icons/TrendUpIcon.vue';
import DonutChart from '@/components/charts/DonutChart.vue';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart.vue';
import LineChart from '@/components/charts/LineChart.vue';
import BarChart from '@/components/charts/BarChart.vue';

export default defineComponent({
	components: {
		Alert,
		Card,
		CardContent,
		CardHeader,
		DollarIcon,
		DonutChart,
		HorizontalBarChart,
		LineChart,
		BarChart,
		Select,
		TrendDownIcon,
		TrendUpIcon,
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

		return { form, items };
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
			<Card>
				<div class="flex flex-row justify-between items-center">
					<DollarIcon
						class="w-20 sm:w-24 h-20 sm:h-24 text-primary"
					/>
					<div class="text-right leading-tight">
						<p class="text-lg text-gray-700">
							Total Saved 2020
						</p>
						<p
							class="text-primary text-3xl sm:text-4xl font-header tracking-tight"
						>
							$300,378.60
						</p>
						<p class="text-gray-600 text-xs sm:text-sm">
							Monthly average $12,547.32
						</p>
					</div>
				</div>
			</Card>

			<Card>
				<div class="flex flex-row justify-between items-center">
					<TrendUpIcon
						class="w-20 sm:w-24 h-20 sm:h-24 text-secondary"
					/>
					<div class="text-right leading-tight">
						<p class="text-lg text-gray-700">Total Earned 2020</p>
						<p
							class="text-secondary text-3xl sm:text-4xl font-header tracking-tight"
						>
							$376,530.63
						</p>
						<p class="text-gray-600 text-xs sm:text-sm">
							Monthly average $22,066.32
						</p>
					</div>
				</div>
			</Card>

			<Card>
				<div class="flex flex-row justify-between items-center">
					<TrendDownIcon
						class="w-20 sm:w-24 h-20 sm:h-24 text-danger"
					/>
					<div class="text-right leading-tight">
						<p class="text-lg text-gray-700">Total Spent 2020</p>
						<p
							class="text-danger text-3xl sm:text-4xl font-header tracking-tight"
						>
							$76,152.03
						</p>
						<p class="text-gray-600 text-xs sm:text-sm">
							Monthly average $9,519.00
						</p>
					</div>
				</div>
			</Card>
		</div>

		<div class="grid grid-cols-1 px-2 sm:grid-cols-3 sm:gap-6 sm:px-0">
			<Card class="col-span-2">
				<CardHeader>
					<h2 class="text-gray-700 text-lg">Spending Habits 2020</h2>
				</CardHeader>

				<CardContent>
					<div class="hidden sm:block">
						<HorizontalBarChart />
					</div>

					<div class="block sm:hidden">
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
