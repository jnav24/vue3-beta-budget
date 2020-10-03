<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardFooter from '@/components/ui-elements/card/CardFooter.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';
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
		const { toTitleCase } = useUtils();
		const headers: string[] = [];
		let total = 0;

		const setHeaders = () => {
			if (props.type === 'vehicles') {
				headers.push('Vehicle');
				headers.push('Mileage');
			} else {
				headers.push('Name');
			}

			if (props.type !== 'miscellaneous') {
				headers.push('Type');
			}

			if (!['banks', 'investments'].includes(props.type)) {
				headers.push('Paid Date');
			}

			if (
				['vehicles', 'credit-cards', 'loans', 'housing'].includes(
					props.type
				)
			) {
				headers.push('Balance');
			}

			headers.push('Amount');
		};

		const setTotalAmount = () => {
			total = (props.data as Array<
				Record<string, { amount: number }>
			>).reduce((acc, item) => {
				return acc + Number(item.amount);
			}, 0);
			emit('set-table-total', total);
		};

		onMounted(() => {
			setHeaders();
			setTotalAmount();
		});

		return { headers, total, toTitleCase };
	},
});
</script>

<template>
	<section class="mb-24">
		<div class="mt-4 flex flex-row items-center justify-between">
			<h2 class="text-2xl text-gray-600 font-body">
				January
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
						{{ header }}
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<div
					v-if="!data.length"
					class="py-16 text-gray-500 flex flex-col items-center justify-center"
				>
					<WarningIcon class="w-8 h-8" />
					<span>{{ toTitleCase(type) }} is empty.</span>
				</div>

				<div
					v-for="item in data"
					:key="item.id"
					:class="
						`grid gap-2 grid-cols-2 sm:grid-cols-${headers.length} text-gray-700 py-4 even:bg-gray-100 items-center`
					"
				>
					<div
						v-for="(header, index) in headers"
						:key="index"
						class="col-span-1"
						:class="{
							'hidden sm:block': ![
								'Name',
								'Amount',
								'Vehicle',
							].includes(header),
						}"
					>
						<!-- @todo get elements from data -->
						{{ header }}
					</div>
				</div>
			</CardContent>

			<CardFooter
				class="bg-gray-100 overflow-hidden pt-2 rounded-b text-right"
			>
				<span class="text-gray-600 mr-2 text-base">Total</span>
				<span class="font-bold text-gray-700 text-lg">
					${{ total }}
				</span>
			</CardFooter>
		</Card>
	</section>
</template>
