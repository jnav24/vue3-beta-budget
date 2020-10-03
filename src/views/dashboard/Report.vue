<script lang="ts">
import { defineComponent } from 'vue';
import ArrowUpIcon from '@/components/ui-elements/icons/ArrowUpIcon.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import LineChart from '@/components/charts/LineChart.vue';
import ReportsForm from '@/components/partials/ReportsForm.vue';
import ReportsSummary from '@/components/partials/ReportsSummary.vue';
import ReportsTable from '@/components/tables/ReportsTable.vue';

export default defineComponent({
	components: {
		ArrowUpIcon,
		Card,
		CardContent,
		CardHeader,
		LineChart,
		ReportsForm,
		ReportsSummary,
		ReportsTable,
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

	<main class="container mx-auto px-4 sm:px-0 py-6">
		<div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
			<aside class="col-span-1">
				<ReportsSummary title="YTD Gains/Loss" amount="253.983.23">
					<ArrowUpIcon class="w-4 h-4 text-primary" />
					<span class="text-primary">85%</span>
				</ReportsSummary>

				<ReportsSummary title="Monthly Average" amount="253.983.23" />

				<ReportsSummary title="Beginning Balances" amount="253.983.23">
					June
				</ReportsSummary>

				<ReportsSummary title="Ending Balances" amount="253.983.23">
					June
				</ReportsSummary>

				<ReportsSummary title="Highest Balances" amount="253.983.23">
					June
				</ReportsSummary>

				<ReportsSummary title="Lowest Balances" amount="253.983.23">
					June
				</ReportsSummary>
			</aside>

			<Card class="col-span-4 hidden sm:grid">
				<CardHeader>Hello</CardHeader>
				<CardContent>
					<LineChart />
				</CardContent>
			</Card>
		</div>

		<ReportsTable :data="[]" type="banks" />
		<ReportsTable :data="[]" type="vehicles" />
		<ReportsTable :data="[]" type="credit-cards" />
		<ReportsTable :data="[]" type="Banks" />
	</main>
</template>
