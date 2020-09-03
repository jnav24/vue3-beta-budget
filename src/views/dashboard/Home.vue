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
import HorizontalBarChart from '@/components/charts/HorizontalBarChart.vue';
import LineChart from '@/components/charts/LineChart.vue';

export default defineComponent({
	components: {
		Alert,
		Card,
		CardContent,
		CardHeader,
		DollarIcon,
		HorizontalBarChart,
		LineChart,
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

		<Card>
			<CardHeader>
				<div class="flex flex-row justify-between">
					<h1 class="font-header text-dark-primary text-2xl ml-2">
						Yearly Overview
					</h1>
					<Select v-model:value="form.year.value" :items="items" />
				</div>
			</CardHeader>

			<CardContent>
				<LineChart />
			</CardContent>
		</Card>

		<div class="grid grid-cols-3 gap-6">
			<Card>
				<div class="flex flex-row justify-between items-center">
					<DollarIcon styles="w-24 h-24 text-primary" />
					<div class="text-right leading-tight">
						<p class="text-lg text-gray-700">
							Total Saved 2020
						</p>
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
				<CardHeader>
					<h2 class="text-gray-700 text-lg">Spending Habits 2020</h2>
				</CardHeader>

				<CardContent>
					<HorizontalBarChart />
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
