<script lang="ts">
import { defineComponent, ref } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import LineChart from '@/components/charts/LineChart.vue';
import ReportsEmpty from '@/components/partials/ReportsEmpty.vue';
import ReportsForm from '@/components/partials/ReportsForm.vue';
import ReportsSkeleton from '@/components/partials/ReportsSkeleton.vue';
import ReportsSummary from '@/components/partials/ReportsSummary.vue';
import ReportsTable from '@/components/tables/ReportsTable.vue';
import useHttp from '@/hooks/useHttp';

export default defineComponent({
	components: {
		Card,
		CardContent,
		CardHeader,
		LineChart,
		ReportsEmpty,
		ReportsForm,
		ReportsSkeleton,
		ReportsSummary,
		ReportsTable,
	},
	setup() {
		const { postAuth, getDataFromResponse } = useHttp();

		const type = ref('');
		const hasSearched = ref(false);
		const isLoading = ref(false);
		const searchResults = ref([]);

		const runSearch = async (params: Record<string, string>) => {
			isLoading.value = true;
			type.value = params.billType;
			const data = {
				path: 'search',
				params,
			};
			const response = await postAuth(data);

			if (response.success) {
				console.log(getDataFromResponse(response));
				searchResults.value = getDataFromResponse(response);
			}

			hasSearched.value = true;
			isLoading.value = false;
		};

		return { hasSearched, isLoading, runSearch, searchResults, type };
	},
});
</script>

<template>
	<div class="bg-gray-100 w-full">
		<div class="container mx-auto py-8">
			<ReportsForm @run-search="runSearch($event)" />
		</div>
	</div>

	<ReportsSkeleton v-if="isLoading" />

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
		v-if="searchResults.length && !isLoading && hasSearched"
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

		<ReportsTable
			v-for="results in searchResults"
			:key="results.id"
			:data="results"
			:type="type"
		/>
	</main>
</template>
