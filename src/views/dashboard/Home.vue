<script lang="ts">
import { defineComponent } from 'vue';
import Alert from '@/components/Alert.vue';
import Card from '@/components/ui-elements/Card.vue';
import DollarIcon from '@/components/ui-elements/icons/DollarIcon.vue';
import LineChart from '@/components/charts/LineChart.vue';
import TrendDownIcon from '@/components/ui-elements/icons/TrendDownIcon.vue';
import TrendUpIcon from '@/components/ui-elements/icons/TrendUpIcon.vue';

export default defineComponent({
	components: {
		Alert,
		Card,
		DollarIcon,
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
	</div>
</template>
