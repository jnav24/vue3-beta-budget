<script lang="ts">
import { defineComponent, ref } from 'vue';
import BanIcon from '@/components/ui-elements/icons/BanIcon.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import ChevronDownIcon from '@/components/ui-elements/icons/ChevronDownIcon.vue';
import EditIcon from '@/components/ui-elements/icons/EditIcon.vue';
import FireIcon from '@/components/ui-elements/icons/FireIcon.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import SubNav from '@/components/partials/SubNav.vue';
import SubNavItems from '@/components/partials/SubNavItems.vue';
import TrendDownIcon from '@/components/ui-elements/icons/TrendDownIcon.vue';
import TrendUpIcon from '@/components/ui-elements/icons/TrendUpIcon.vue';
import { useRouter } from 'vue-router';
import useUtils from '@/hooks/useUtils';
import YTDSummary from '@/components/partials/YTDSummary.vue';

export default defineComponent({
	components: {
		BanIcon,
		Button,
		Card,
		CardContent,
		CardHeader,
		ChevronDownIcon,
		EditIcon,
		FireIcon,
		Select,
		SubNav,
		SubNavItems,
		TrendDownIcon,
		TrendUpIcon,
		YTDSummary,
	},
	setup() {
		const { arrayColumn } = useUtils();
		const { push } = useRouter();
		const addBudgetItems = [
			{ value: '', label: 'Monthly Budget', icon: 'CalendarIcon' },
			{ value: '', label: 'Blank Budget', icon: 'ArchiveIcon' },
		];
		const showAddBudgetNav = ref(false);
		const budgets = [
			{ id: '1', name: 'January', saved: '13023.55' },
			{ id: '2', name: 'February', saved: '86512.12' },
			{ id: '3', name: 'March', saved: '12224.03' },
			{ id: '4', name: 'April', saved: '16032.13' },
			{ id: '5', name: 'May', saved: '-217.00' },
			{ id: '6', name: 'June', saved: '60217.00' },
			{ id: '7', name: 'July', saved: '60217.00' },
			{ id: '8', name: 'August', saved: '60217.00' },
			{ id: '9', name: 'September', saved: '60217.00' },
			{ id: '10', name: 'October', saved: '60217.00' },
			{ id: '11', name: 'November', saved: '60217.00' },
			{ id: '12', name: 'December', saved: '60217.00' },
		];
		const maxSaved = Math.max(
			...arrayColumn('saved', budgets).map(val => Number(val))
		).toString();

		const years = [
			{ label: '2020', value: '2020' },
			{ label: '2019', value: '2019' },
		];
		const selectedYear = ref('2020');

		const goToEditPage = (id: string) =>
			push({ name: 'budget-edit', params: { id } });

		return {
			addBudgetItems,
			showAddBudgetNav,
			budgets,
			goToEditPage,
			maxSaved,
			selectedYear,
			years,
		};
	},
});
</script>

<template>
	<div class="container mx-auto py-6">
		<div class="grid grid-cols-2 gap-4 mb-8 hidden md:grid">
			<Card>
				<CardHeader class="text-gray-700">
					1 Year Performance
				</CardHeader>
				<CardContent>
					<div class="flex flex-row items-center">
						<div class="flex-1 flex flex-row justify-center">
							<YTDSummary
								color="#45ADA8"
								percentage="65"
								text="Saved since last year."
							/>
						</div>
						<div class="bg-gray-300 w-px h-32 rounded" />
						<div class="flex-1 flex flex-row justify-center">
							<YTDSummary
								color="#C62828"
								percentage="3"
								text="Spent since last year."
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="text-gray-700">
					5 Year Performance
				</CardHeader>
				<CardContent>
					<div class="flex flex-row items-center">
						<div class="flex-1 flex flex-row justify-center">
							<YTDSummary
								color="#45ADA8"
								percentage="93"
								text="Saved over 5 years."
							/>
						</div>
						<div class="bg-gray-300 w-px h-32 rounded" />
						<div class="flex-1 flex flex-row justify-center">
							<YTDSummary
								color="#C62828"
								percentage="1"
								text="Spent over 5 years."
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

		<div
			class="flex flex-col sm:flex-row items-center justify-end pl-4 pr-2 sm:px-0"
		>
			<Button color="secondary" class="mb-4 sm:mb-0 w-full sm:w-auto">
				<EditIcon class="w-4 h-4 mr-2" />
				<span>Edit Template</span>
			</Button>

			<SubNav class="w-full sm:w-auto mr-2 sm:mr-0">
				<Button
					class="mb-4 sm:mb-0 w-full sm:w-auto pr-2"
					@on-click="showAddBudgetNav = !showAddBudgetNav"
					@blur="showAddBudgetNav = false"
				>
					<span class="flex-1">Add Budget</span>
					<span
						class="border-l border-dark-primary border-opacity-25 ml-4 pl-2"
					>
						<ChevronDownIcon class="w-5 h-5" />
					</span>
				</Button>

				<SubNavItems :items="addBudgetItems" :show="showAddBudgetNav" />
			</SubNav>

			<Select
				class="block sm:hidden w-full"
				placeholder="Select a year"
				:value="selectedYear"
				:items="years"
			/>
		</div>

		<div class="grid grid-cols-4 gap-3">
			<div class="py-4 hidden sm:block">
				<p class="mb-6 text-lg text-gray-700 font-body">Years</p>

				<ul>
					<li
						v-for="(year, int) in years"
						:key="int"
						:class="{
							'text-gray-500 text-sm hover:text-gray-700 cursor-pointer px-2 py-2':
								year.value !== selectedYear,
							'text-gray-700 text-sm cursor-pointer px-2 py-2 bg-gray-300 rounded':
								year.value === selectedYear,
						}"
					>
						{{ year.label }}
					</li>
				</ul>
			</div>
			<Card class="col-span-4 sm:col-span-3 ml-3 mr-4 sm:mx-0">
				<CardHeader class="bg-gray-100">
					<div
						class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-900"
					>
						<div class="hidden sm:block" />
						<div>Name</div>
						<div class="hidden sm:block">Saved</div>
						<div>Actions</div>
					</div>
				</CardHeader>
				<CardContent class="px-0">
					<div
						v-for="item in budgets"
						:key="item.id"
						class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-700 py-4 even:bg-gray-100"
					>
						<div
							class="hidden sm:flex flex-row justify-start pl-16"
						>
							<TrendDownIcon
								class="text-danger w-8 h-8"
								v-if="item.saved < 0"
							/>
							<TrendUpIcon
								class="text-primary w-8 h-8"
								v-if="item.saved >= 0"
							/>
							<FireIcon
								class="text-orange-400 w-8 h-8"
								v-if="item.saved === maxSaved"
							/>
						</div>
						<div class="pl-4 sm:pl-0">{{ item.name }}</div>
						<div class="hidden sm:block">
							${{ item.saved.replace('-', '') }}
						</div>
						<div>
							<button
								class="bg-secondary hover:bg-opacity-85 active:bg-dark-primary focus:outline-none focus:shadow-outline rounded-full p-2 mr-2"
								@click="goToEditPage(item.id)"
							>
								<EditIcon class="text-white w-5 h-5" />
							</button>

							<button
								class="bg-danger hover:bg-opacity-85 active:bg-dark-danger focus:outline-none focus:shadow-outline rounded-full p-2"
							>
								<BanIcon class="text-white w-5 h-5" />
							</button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</template>
