import { createStore } from "pinia";

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
	actions: {},
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
