import { createStore } from 'pinia';
import useHttp from '@/hooks/useHttp';

export const useAggregationStore = createStore({
	id: 'aggregation',

	state: (): AggregationState => ({
		budget: {},
		unpaid: {
			id: 0,
			totals: {
				credit_cards: 0,
				medical: 0,
				miscellaneous: 0,
				utilities: 0,
			},
		},
	}),

	getters: {
		allYears() {
			const yearList: string[] = Object.keys(this.budget);
			const yearObjList: Array<{ value: string; label: string }> = [];

			for (const year of yearList) {
				yearObjList.push({ value: year, label: year });
			}

			return yearObjList;
		},

		totalUnpaid() {
			let total = 0;

			if (this.unpaid.totals) {
				for (const key of Object.keys(this.unpaid.totals)) {
					total += Number((this.unpaid.totals as any)[key]);
				}
			}

			return total;
		},
	},

	actions: {
		async getUnpaidBillTotals() {
			const data = {
				path: 'unpaid-aggregate',
			};
			const { getAuth } = useHttp();
			const response = await getAuth(data);

			if (response.success) {
				const { unpaid } = response.data.data;
				this.unpaid = {
					...this.unpaid,
					...unpaid,
				};
			}
		},

		async getSelectedYearAggregate(year: string) {
			const data = {
				path: `current-budget-aggregate/${year}`,
			};
			const { getAuth } = useHttp();
			const response = await getAuth(data);

			if (response.success) {
				const { aggregate } = response.data.data;
				this.budget = {
					...this.budget,
					[year]: { ...aggregate[year] },
				};
			}
		},

		async getYearlyAggregations() {
			const data = {
				path: 'budget-aggregate',
			};
			const { getAuth } = useHttp();
			const response = await getAuth(data);

			if (response.success) {
				const { aggregations } = response.data.data;
				this.budget = {
					...this.budget,
					...aggregations,
				};
			}
		},
	},
});

type AggregationState = {
	budget: {
		[key: string]: {
			earned: string[];
			saved: string[];
			spent: string[];
		};
	};
	unpaid: {
		id: number;
		totals: {
			credit_cards: number;
			medical: number;
			miscellaneous: number;
			utilities: number;
		};
	};
};
