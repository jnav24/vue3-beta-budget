<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import LineChart from '@/components/charts/LineChart.vue';
import ReportsEmpty from '@/components/partials/ReportsEmpty.vue';
import ReportsForm from '@/components/partials/ReportsForm.vue';
import ReportsSummary from '@/components/partials/ReportsSummary.vue';
import ReportsTable from '@/components/tables/ReportsTable.vue';

export default defineComponent({
	components: {
		Card,
		CardContent,
		CardHeader,
		LineChart,
		ReportsEmpty,
		ReportsForm,
		ReportsSummary,
		ReportsTable,
	},
	setup() {
		const hasSearched = ref(false);
		const isLoading = ref(false);
		const searchResults = reactive([]);

		return { hasSearched, isLoading, searchResults };
	},
});
</script>

<template>
	<div class="bg-gray-100 w-full">
		<div class="container mx-auto py-8">
			<ReportsForm />
		</div>
	</div>

	<ReportsEmpty
		v-if="!searchResults.length && !isLoading && hasSearched"
		icon="SadIcon"
		title="No results found."
		text="Try modifying your search criteria to find what your are looking for."
	/>

	<ReportsEmpty
		v-if="!searchResults.length && !isLoading && !hasSearched"
		icon="SearchIcon"
		title="Nothing, yet."
		text="Looks like you haven't tried to run a search yet."
	/>

	<main
		v-if="searchResults.length"
		class="container mx-auto px-4 sm:px-0 py-6"
	>
		<div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
			<aside class="col-span-1 lg:col-span-1">
				<div class="block sm:grid-cols-3 sm:grid sm:gap-2 lg:block">
					<ReportsSummary
						title="YTD Gains/Loss"
						amount="253.983.23"
						percentage="85"
					/>

					<ReportsSummary
						title="Monthly Average"
						amount="253.983.23"
					/>

					<ReportsSummary
						title="Beginning Balances"
						amount="253.983.23"
						text="June"
					/>

					<ReportsSummary
						title="Ending Balances"
						amount="253.983.23"
						text="March"
					/>

					<ReportsSummary
						title="Highest Balances"
						amount="253.983.23"
						text="August"
					/>

					<ReportsSummary
						title="Lowest Balances"
						amount="253.983.23"
						text="October"
					/>
				</div>
			</aside>

			<Card class="col-span-1 lg:col-span-4 hidden sm:grid">
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
