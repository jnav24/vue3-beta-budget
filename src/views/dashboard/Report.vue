<script lang="ts">
import { defineComponent } from 'vue';
import ArrowUpIcon from '@/components/ui-elements/icons/ArrowUpIcon.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import LineChart from '@/components/charts/LineChart.vue';
import ReportsForm from '@/components/partials/ReportsForm.vue';

export default defineComponent({
	components: {
		ArrowUpIcon,
		Card,
		LineChart,
		ReportsForm,
	},
	setup() {
		return {};
	},
});
</script>

<template>
	<div class="bg-gray-100 w-full">
		<div class="container mx-auto py-8">
			<ReportsForm />
		</div>
	</div>

	<main class="container mx-auto py-6">
		<div class="grid grid-cols-5 gap-4">
			<aside class="col-span-1">
				<Card>
					<p class="text-gray-500 text-sm">YTD</p>
					<div class="flex flex-row items-baseline">
						<p class="text-xl text-gray-700">$253,983.23</p>
						<p
							class="text-sm flex flex-row items-baseline ml-2 space-x-1"
						>
							<ArrowUpIcon class="w-4 h-4 text-primary" />
							<span class="text-primary">85%</span>
						</p>
					</div>
				</Card>

				<Card>
					<p class="text-gray-500 text-sm">Average</p>
					<div class="flex flex-row items-baseline">
						<p class="text-xl text-gray-700">$253,983.23</p>
						<p
							class="text-sm text-gray-500 flex flex-row items-baseline ml-2 space-x-1"
						></p>
					</div>
				</Card>

				<Card>
					<p class="text-gray-500 text-sm">Beginning Balances</p>
					<div class="flex flex-row items-baseline">
						<p class="text-xl text-gray-700">$253,983.23</p>
						<p
							class="text-sm text-gray-500 flex flex-row items-baseline ml-2 space-x-1"
						>
							June
						</p>
					</div>
				</Card>

				<Card>
					<p class="text-gray-500 text-sm">Ending Balances</p>
					<div class="flex flex-row items-baseline">
						<p class="text-xl text-gray-700">$253,983.23</p>
						<p
							class="text-sm text-gray-500 flex flex-row items-baseline ml-2 space-x-1"
						>
							June
						</p>
					</div>
				</Card>

				<Card>
					<p class="text-gray-500 text-sm">Highest Balances</p>
					<div class="flex flex-row items-baseline">
						<p class="text-xl text-gray-700">$253,983.23</p>
						<p
							class="text-sm text-gray-500 flex flex-row items-baseline ml-2 space-x-1"
						>
							June
						</p>
					</div>
				</Card>

				<Card>
					<p class="text-gray-500 text-sm">Lowest Balances</p>
					<div class="flex flex-row items-baseline">
						<p class="text-xl text-gray-700">$253,983.23</p>
						<p
							class="text-sm text-gray-500 flex flex-row items-baseline ml-2 space-x-1"
						>
							June
						</p>
					</div>
				</Card>
			</aside>

			<Card class="col-span-4">
				<LineChart />
			</Card>
		</div>
	</main>
</template>
