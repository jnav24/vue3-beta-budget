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
import SideBar from '@/components/partials/SideBar.vue';
import SubNav from '@/components/partials/SubNav.vue';
import SubNavItems from '@/components/partials/SubNavItems.vue';
import TrendDownIcon from '@/components/ui-elements/icons/TrendDownIcon.vue';
import TrendUpIcon from '@/components/ui-elements/icons/TrendUpIcon.vue';
import { useBudgetStore } from '@/store';
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
		SideBar,
		SubNav,
		SubNavItems,
		TrendDownIcon,
		TrendUpIcon,
		YTDSummary,
	},
	setup() {
		const { arrayColumn } = useUtils();
		const budgetStore = useBudgetStore();
		const { push } = useRouter();
		const addBudgetItems = [
			{ value: '', label: 'Monthly Budget', icon: 'CalendarIcon' },
			{ value: '', label: 'Blank Budget', icon: 'ArchiveIcon' },
		];
		const showAddBudgetNav = ref(false);
		const budgets = budgetStore.list;
		const maxSaved = Math.max(
			...arrayColumn('saved', budgets as any).map(val => Number(val))
		).toString();

		const years = [
			{ label: '2020', value: '2020' },
			{ label: '2019', value: '2019' },
		];
		const selectedYear = ref('2020');

		const goToEditPage = (id: string) =>
			push({ name: 'budget-edit', params: { id } });

		const goToTemplatePage = () => push({ name: 'budget-template' });

		return {
			addBudgetItems,
			showAddBudgetNav,
			budgets,
			goToEditPage,
			goToTemplatePage,
			maxSaved,
			selectedYear,
			years,
		};
	},
});
</script>

<template>
	<div class="container mx-auto py-6">
		<div class="grid grid-cols-2 gap-4 mb-8 hidden sm:block md:grid">
			<Card class="hidden sm:block">
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

			<Card class="hidden md:block">
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
			<Button
				color="secondary"
				class="mb-4 sm:mb-0 w-full sm:w-auto"
				@click="goToTemplatePage()"
			>
				<EditIcon class="w-4 h-4 mr-2" />
				<span>Edit Template</span>
			</Button>

			<SubNav class="w-full sm:w-auto mr-2 sm:mr-0">
				<Button
					color="primary"
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
				class="block md:hidden w-full sm:w-40"
				placeholder="Select a year"
				v-model:value="selectedYear"
				:items="years"
			/>
		</div>

		<div class="grid grid-cols-4 gap-3">
			<SideBar
				title="Years"
				:items="years"
				v-model:selected-item="selectedYear"
			/>
			<Card class="col-span-4 md:col-span-3 ml-3 mr-4 sm:mx-0">
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
						class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-700 py-4 even:bg-gray-100 items-center"
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
