<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardFooter from '@/components/ui-elements/card/CardFooter.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';
import useBudgetTable from '@/hooks/useBudgetTable';
import useCurrency from '@/hooks/useCurrency';
import useTimestamp from '@/hooks/useTimestamp';
import useUtils from '@/hooks/useUtils';

export default defineComponent({
	components: {
		Card,
		CardContent,
		CardFooter,
		CardHeader,
		WarningIcon,
	},
	props: {
		data: {
			required: true,
			type: Array,
		},
		type: {
			required: true,
			type: String,
		},
	},
	setup(props, { emit }) {
		const { getExpenseValue } = useBudgetTable();
		const { formatDollar } = useCurrency();
		const { formatDate } = useTimestamp();
		const { toTitleCase } = useUtils();

		const headers: string[] = [];
		let total = 0;

		const setHeaders = () => {
			if (props.type === 'vehicles') {
				headers.push('vehicle');
				headers.push('mileage');
			} else {
				headers.push('name');
			}

			if (props.type !== 'miscellaneous') {
				headers.push('type');
			}

			if (!['banks', 'investments'].includes(props.type)) {
				headers.push('paid_date');
			}

			if (
				['vehicles', 'credit-cards', 'loans', 'housing'].includes(
					props.type
				)
			) {
				headers.push('balance');
			}

			headers.push('amount');
		};

		const setTotalAmount = () => {
			if (props.data) {
				total = (props.data as any)[
					props.type.replace('-', '_')
				].reduce((acc: any, item: any) => {
					return acc + Number(item.amount);
				}, 0);
				emit('set-table-total', total);
			}
		};

		watchEffect(() => {
			setHeaders();
			setTotalAmount();
		});

		return {
			formatDate,
			formatDollar,
			getExpenseValue,
			headers,
			total,
			toTitleCase,
		};
	},
});
</script>

<template>
	<section class="mb-24">
		<div class="mt-4 flex flex-row items-center justify-between">
			<h2 class="text-2xl text-gray-600 font-body">
				{{ formatDate('MMMM', data.budget_cycle) }}
			</h2>
		</div>

		<Card>
			<CardHeader class="bg-gray-100 rounded-t">
				<div
					:class="
						`grid gap-2 grid-cols-2 sm:grid-cols-${headers.length}`
					"
				>
					<div
						class="col-span-1"
						:class="{
							'hidden sm:block': ![
								'Name',
								'Amount',
								'Vehicle',
							].includes(header),
						}"
						v-for="(header, index) in headers"
						:key="index"
					>
						{{ toTitleCase(header, '_') }}
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<div
					v-if="!data[type.replace('-', '_')].length"
					class="py-16 text-gray-500 flex flex-col items-center justify-center"
				>
					<WarningIcon class="w-8 h-8" />
					<span>{{ toTitleCase(type) }} is empty.</span>
				</div>

				<div
					v-for="item in data[type.replace('-', '_')]"
					:key="item.id"
					:class="
						`grid gap-2 grid-cols-2 sm:grid-cols-${headers.length} text-gray-700 py-4 even:bg-gray-100 items-center`
					"
				>
					<div
						v-for="(header, index) in headers"
						:key="index"
						class="col-span-1 first:pl-2"
						:class="{
							'hidden sm:block': ![
								'Name',
								'Amount',
								'Vehicle',
							].includes(header),
						}"
					>
						{{ getExpenseValue(header, item) }}
					</div>
				</div>
			</CardContent>

			<CardFooter
				class="bg-gray-100 overflow-hidden mt-4 pt-2 rounded-b text-right"
			>
				<span class="text-gray-600 mr-2 text-base">Total</span>
				<span class="font-bold text-gray-700 text-lg">
					${{ formatDollar(total) }}
				</span>
			</CardFooter>
		</Card>
	</section>
</template>
