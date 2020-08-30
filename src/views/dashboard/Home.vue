<script lang="ts">
import { defineComponent } from 'vue';
import Alert from '@/components/Alert.vue';
import Card from '@/components/ui-elements/Card.vue';
import DollarIcon from '@/components/ui-elements/icons/DollarIcon.vue';
import HorizontalBarChart from '@/components/charts/HorizontalBarChart.vue';
import LineChart from '@/components/charts/LineChart.vue';
import TrendDownIcon from '@/components/ui-elements/icons/TrendDownIcon.vue';
import TrendUpIcon from '@/components/ui-elements/icons/TrendUpIcon.vue';

export default defineComponent({
	components: {
		Alert,
		Card,
		DollarIcon,
		HorizontalBarChart,
		LineChart,
		TrendDownIcon,
		TrendUpIcon,
	},
});
</script>

<template>
	<div class="container mx-auto py-6">
		<Alert type="warn" message="You have 19 unpaid bills"></Alert>

		<Card>
			<div class="flex flex-row justify-between my-6">
				<h1 class="font-header text-dark-primary text-2xl ml-2">
					Yearly Overview
				</h1>
				<div
					class="border-solid border border-dark-primary px-2 py-2 w-40 rounded-md flex items-center justify-between mr-3"
				>
					<span class="text-dark-primary flex-1">2020</span>
					<svg
						viewBox="0 0 20 20"
						fill="currentColor"
						class="chevron-down w-6 h-6 text-gray-700"
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						></path>
					</svg>
				</div>
			</div>

			<LineChart />
		</Card>

		<div class="grid grid-cols-3 gap-6">
			<Card>
				<div class="flex flex-row justify-between items-center">
					<DollarIcon styles="w-24 h-24 text-primary" />
					<div class="text-right leading-tight">
						<p class="text-lg text-gray-700">Total Saved 2020</p>
						<p
							class="text-primary text-4xl font-header tracking-tight"
						>
							$300,378.60
						</p>
						<p class="text-gray-600 text-sm">
							Monthly average $12,547.32
						</p>
					</div>
				</div>
			</Card>

			<Card>
				<div class="flex flex-row justify-between items-center">
					<TrendUpIcon styles="w-24 h-24 text-secondary" />
					<div class="text-right leading-tight">
						<p class="text-lg text-gray-700">Total Earned 2020</p>
						<p
							class="text-secondary text-4xl font-header tracking-tight"
						>
							$376,530.63
						</p>
						<p class="text-gray-600 text-sm">
							Monthly average $22,066.32
						</p>
					</div>
				</div>
			</Card>

			<Card>
				<div class="flex flex-row justify-between items-center">
					<TrendDownIcon styles="w-24 h-24 text-danger" />
					<div class="text-right leading-tight">
						<p class="text-lg text-gray-700">Total Spent 2020</p>
						<p
							class="text-danger text-4xl font-header tracking-tight"
						>
							$76,152.03
						</p>
						<p class="text-gray-600 text-sm">
							Monthly average $9,519.00
						</p>
					</div>
				</div>
			</Card>
		</div>

		<div class="grid grid-cols-3 gap-6">
			<Card class="col-span-2">
				<h2 class="text-gray-700 text-lg">Spending Habits 2020</h2>
				<HorizontalBarChart />
			</Card>

			<Card>
				<h2 class="text-gray-700 text-lg">Activity</h2>
			</Card>
		</div>
	</div>
</template>
