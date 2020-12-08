<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import LineChart from '@/components/charts/LineChart.vue';
import ReportsEmpty from '@/components/partials/ReportsEmpty.vue';
import ReportsForm from '@/components/partials/ReportsForm.vue';
import ReportsSkeleton from '@/components/partials/ReportsSkeleton.vue';
import ReportsSummary from '@/components/partials/ReportsSummary.vue';
import ReportsTable from '@/components/tables/ReportsTable.vue';
import useCurrency from '@/hooks/useCurrency';
import useHttp from '@/hooks/useHttp';
import useTimestamp from '@/hooks/useTimestamp';

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
		const { formatDollar } = useCurrency();
		const { postAuth, getDataFromResponse } = useHttp();
		const { formatDate } = useTimestamp();

		const averageBalance = ref('0.00');
		const endBalance = reactive({
			amount: '',
			month: '',
		});
		const highestBalance = reactive({
			amount: '',
			month: '',
		});
		const lowestBalance = reactive({
			amount: '',
			month: '',
		});
		const startBalance = reactive({
			amount: '',
			month: '',
		});
		const ytdBalance = reactive({
			amount: '0.00',
			percent: '0',
		});
		const type = ref('');
		const hasSearched = ref(false);
		const isLoading = ref(false);
		const searchResults = ref([]);
		const summaryData: Record<string, number> = reactive({});
		const year = ref('');

		const runSearch = async (params: Record<string, string>) => {
			isLoading.value = true;
			type.value = params.billType;
			const data = {
				path: 'search',
				params,
			};
			const response = await postAuth(data);

			if (response.success) {
				year.value = params.year;
				searchResults.value = getDataFromResponse(response);
			}

			hasSearched.value = true;
			isLoading.value = false;
		};

		const setSummary = (total: number, cycle: string) => {
			summaryData[formatDate('MMMM', cycle)] = total;
		};

		watch(summaryData, summary => {
			const months = Object.keys(summary);
			const dollars = Object.values(summary);
			const maxDollars = Math.max(...dollars);
			const minDollars = Math.min(...dollars);

			averageBalance.value = formatDollar(
				(dollars.reduce((a, c) => a + c, 0) / dollars.length).toString()
			);
			endBalance.amount = formatDollar(dollars[dollars.length - 1]);
			endBalance.month = months[months.length - 1];
			highestBalance.amount = formatDollar(maxDollars);
			highestBalance.month = months[dollars.indexOf(maxDollars)];
			lowestBalance.amount = formatDollar(minDollars);
			lowestBalance.month = months[dollars.indexOf(minDollars)];
			startBalance.amount = formatDollar(dollars[0]);
			startBalance.month = months[0];
			ytdBalance.percent = Math.round(
				((dollars[dollars.length - 1] - dollars[0]) / dollars[0]) * 100
			).toString();

			if (['banks', 'investments'].includes(type.value)) {
				ytdBalance.amount = formatDollar(
					dollars[dollars.length - 1] - dollars[0]
				);
			} else {
				ytdBalance.amount = formatDollar(
					dollars.reduce((a, c) => a + c, 0)
				);
			}
		});

		return {
			averageBalance,
			endBalance,
			hasSearched,
			highestBalance,
			lowestBalance,
			isLoading,
			runSearch,
			searchResults,
			setSummary,
			startBalance,
			type,
			year,
			ytdBalance,
		};
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
						:amount="ytdBalance.amount"
						:percentage="ytdBalance.percent"
					/>

					<ReportsSummary
						title="Monthly Average"
						:amount="averageBalance"
					/>

					<ReportsSummary
						title="Beginning Balances"
						:amount="startBalance.amount"
						:text="startBalance.month"
					/>

					<ReportsSummary
						title="Ending Balances"
						:amount="endBalance.amount"
						:text="endBalance.month"
					/>

					<ReportsSummary
						title="Highest Balances"
						:amount="highestBalance.amount"
						:text="highestBalance.month"
					/>

					<ReportsSummary
						title="Lowest Balances"
						:amount="lowestBalance.amount"
						:text="lowestBalance.month"
					/>
				</div>
			</aside>

			<Card class="col-span-1 lg:col-span-4 hidden sm:grid">
				<CardHeader>{{ year }} Chart</CardHeader>
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
			@set-table-total="setSummary($event, results.budget_cycle)"
		/>
	</main>
</template>
