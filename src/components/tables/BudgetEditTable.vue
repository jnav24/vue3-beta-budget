<script lang="ts">
import { computed, defineComponent } from 'vue';
import BanIcon from '@/components/ui-elements/icons/BanIcon.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import CheckIcon from '@/components/ui-elements/icons/CheckIcon.vue';
import EditIcon from '@/components/ui-elements/icons/EditIcon.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';
import useUtils from '@/hooks/useUtils';

type ExpenseType = {
	name: string;
	type: string;
	amount: string;
	balance: string;
	paid_date: string;
};

export default defineComponent({
	components: {
		BanIcon,
		Card,
		CardHeader,
		CardContent,
		CheckIcon,
		EditIcon,
		WarningIcon,
	},
	props: {
		category: {
			required: true,
			type: String,
		},
		data: {
			required: true,
			type: Array as () => Partial<ExpenseType>,
		},
	},
	setup(props) {
		const { ucFirst } = useUtils();
		const headers: Record<string, Array<string>> = {
			common: [
				'',
				'name',
				'type',
				'amount',
				'due date/paid date',
				'actions',
			],
			'credit-cards': [
				'',
				'name',
				'type',
				'amount',
				'balance',
				'due date',
				'actions',
			],
			income: ['name', 'type', 'amount', 'paid date', 'actions'],
			miscellaneous: [
				'',
				'name',
				'amount',
				'due date/paid date',
				'actions',
			],
			savings: ['name', 'type', 'amount', 'actions'],
			vehicles: [
				'',
				'name',
				'type',
				'amount',
				'balance',
				'due date/paid date',
				'actions',
			],
		};

		const categoryHeader = computed(() => {
			const categoryMap: Record<string, string> = {
				banks: 'savings',
				investments: 'savings',
			};

			if (headers[props.category]) {
				return headers[props.category];
			}

			if (!headers[props.category] && categoryMap[props.category]) {
				return headers[categoryMap[props.category]];
			}

			return headers.common;
		});

		const getExpenseValue = (
			header: string,
			item: Record<string, string>
		): string => {
			if (['amount', 'balance'].includes(header)) {
				return `$${item[header]}`;
			}

			if (item[header]) {
				return item[header];
			}

			if (header === 'type') {
				return (
					Object.keys(item)
						.filter((key: string) => /[a-z]*_type_[a-z]*/.exec(key))
						.shift() ?? ''
				);
			}

			if (header === 'due date') {
				if (item['paid_date']) {
					return item['paid_date'];
				}

				if (item['initial_pay_date']) {
					return item['initial_pay_date'];
				}
			}

			return '';
		};

		return { categoryHeader, getExpenseValue, ucFirst };
	},
});
</script>

<template>
	<Card>
		<CardHeader class="bg-gray-100">
			<div
				:class="
					`grid gap-2 grid-cols-2 sm:grid-cols-${categoryHeader.length}`
				"
			>
				<div
					v-for="(header, index) in categoryHeader"
					:key="index"
					:class="{
						'pl-2': index === 0,
						'hidden sm:block': !['name', 'actions'].includes(
							header
						),
					}"
				>
					{{ ucFirst(header) }}
				</div>
			</div>
		</CardHeader>

		<CardContent>
			<div
				v-if="!data[category].length"
				class="py-32 text-gray-500 flex flex-col items-center justify-center"
			>
				<WarningIcon class="w-8 h-8" />
				<span>{{ ucFirst(category) }} is empty.</span>
			</div>

			<div
				:class="
					`grid grid-cols-2 sm:grid-cols-${categoryHeader.length} gap-2 text-gray-700 py-4 even:bg-gray-100 items-center`
				"
				v-for="item in data[category]"
				:key="item.id"
			>
				<div
					class="col-span-1"
					:class="{
						'pl-2': index === 0,
						'hidden sm:block': !['name', 'actions'].includes(
							header
						),
					}"
					v-for="(header, index) in categoryHeader"
					:key="index"
				>
					<template v-if="!header.trim().length">
						<div class="rounded-full p-2 bg-primary w-8 mr-2">
							<CheckIcon class="w-4 h-4 text-white" />
						</div>
					</template>

					<div
						class="flex flex-row items-center"
						v-if="header === 'actions'"
					>
						<div class="rounded-full p-2 bg-secondary w-8 mr-2">
							<EditIcon class="w-4 h-4" />
						</div>
						<div class="rounded-full p-2 bg-danger w-8">
							<BanIcon class="w-4 h-4 text-white" />
						</div>
					</div>

					<div
						class="truncate"
						v-if="header !== 'actions' && header.trim().length"
					>
						{{ getExpenseValue(header, item) }}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
</template>
