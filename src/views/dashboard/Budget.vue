<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import BanIcon from '@/components/ui-elements/icons/BanIcon.vue';
import BudgetModal from '@/components/modals/BudgetModal.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import CardContent from '@/components/ui-elements/card/CardContent.vue';
import CardHeader from '@/components/ui-elements/card/CardHeader.vue';
import ChevronDownIcon from '@/components/ui-elements/icons/ChevronDownIcon.vue';
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue';
import CustomBudgetModal from '@/components/modals/CustomBudgetModal.vue';
import EditIcon from '@/components/ui-elements/icons/EditIcon.vue';
import FireIcon from '@/components/ui-elements/icons/FireIcon.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import SideBar from '@/components/partials/SideBar.vue';
import SubNav from '@/components/partials/SubNav.vue';
import SubNavItems from '@/components/partials/SubNavItems.vue';
import TrendDownIcon from '@/components/ui-elements/icons/TrendDownIcon.vue';
import TrendUpIcon from '@/components/ui-elements/icons/TrendUpIcon.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';
import { useBudgetStore } from '@/store';
import { useRouter } from 'vue-router';
import useCurrency from '@/hooks/useCurrency';
import useRemoveExpense from '@/hooks/useRemoveExpense';
import useUtils from '@/hooks/useUtils';
import { useAggregationStore } from '@/store';
import YTDSummary from '@/components/partials/YTDSummary.vue';

export default defineComponent({
	components: {
		BanIcon,
		BudgetModal,
		Button,
		Card,
		CardContent,
		CardHeader,
		ChevronDownIcon,
		ConfirmationModal,
		CustomBudgetModal,
		EditIcon,
		FireIcon,
		Select,
		SideBar,
		SubNav,
		SubNavItems,
		TrendDownIcon,
		TrendUpIcon,
		WarningIcon,
		YTDSummary,
	},
	setup() {
		const { arrayColumn } = useUtils();
		const { push } = useRouter();
		const {
			getRemoveExpenseList,
			removeExpense,
			resetList,
			setItemToBeRemoved,
		} = useRemoveExpense();
		const { formatDollar } = useCurrency();
		const budgetStore = useBudgetStore();
		const aggregationStore = useAggregationStore();

		const addBudgetItems = [
			{ value: 'monthly', label: 'Monthly Budget', icon: 'CalendarIcon' },
			{ value: 'blank', label: 'Blank Budget', icon: 'ArchiveIcon' },
		];
		const showAddBudgetNav = ref(false);
		const showBudgetModal = ref(false);
		const showCustomBudgetModal = ref(false);
		const budgets = computed(() => budgetStore.sortedBudgets);
		const selectedYear = ref('');
		const showConfirmModal = ref(false);
		const maxSaved = computed(() => {
			return Math.max(
				...arrayColumn(
					'saved',
					(budgets.value as any)[selectedYear.value]
				).map(val => Number(val))
			).toString();
		});

		const years = computed(() => {
			const allYears = aggregationStore.allYears;

			if (selectedYear.value === '' && allYears.length) {
				selectedYear.value = allYears[0].value;
			}

			return allYears;
		});

		const confirmRemoveBudget = () => {
			const { save } = removeExpense(
				budgets.value as Record<string, Array<any>>
			);

			if (save) {
				budgetStore.removeBudgets(getRemoveExpenseList()[0]);
				resetList();
			}
		};

		const goToEditPage = (id: string) =>
			push({ name: 'budget-edit', params: { id } });

		const goToTemplatePage = () => push({ name: 'budget-template' });

		const handleNavClick = (e: string) => {
			if (e === 'monthly') {
				showBudgetModal.value = true;
			}

			if (e === 'blank') {
				showCustomBudgetModal.value = true;
			}
		};

		const setDeleteAndShowConfirmation = (id: string | number) => {
			setItemToBeRemoved({ id, category: selectedYear.value });
			showConfirmModal.value = true;
		};

		return {
			addBudgetItems,
			confirmRemoveBudget,
			showAddBudgetNav,
			budgets,
			formatDollar,
			goToEditPage,
			goToTemplatePage,
			handleNavClick,
			maxSaved,
			selectedYear,
			setDeleteAndShowConfirmation,
			showBudgetModal,
			showConfirmModal,
			showCustomBudgetModal,
			years,
		};
	},
});
</script>

<template>
	<ConfirmationModal
		title="Remove Budget"
		text="Are you sure you want to remove this budget?"
		v-model:show="showConfirmModal"
		@confirm="confirmRemoveBudget()"
	/>

	<BudgetModal v-model:show="showBudgetModal" />

	<CustomBudgetModal v-model:show="showCustomBudgetModal" />

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

				<SubNavItems
					:items="addBudgetItems"
					:show="showAddBudgetNav"
					@nav-clicked="handleNavClick($event)"
				/>
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
				<CardHeader class="bg-gray-100 rounded-t-lg">
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
						v-if="
							!budgets[selectedYear] ||
								!budgets[selectedYear].length
						"
						class="py-8 text-gray-500 flex flex-col items-center justify-center"
					>
						<WarningIcon class="w-8 h-8" />
						<span>There are no budgets for {{ selectedYear }}</span>
					</div>

					<div
						v-for="item in budgets[selectedYear]"
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
							${{ formatDollar(item.saved.replace('-', '')) }}
						</div>
						<div>
							<Button
								color="secondary"
								fab
								@on-click="goToEditPage(item.id)"
							>
								<EditIcon class="w-4 h-4" />
							</Button>
							<Button
								color="danger"
								fab
								@click="setDeleteAndShowConfirmation(item.id)"
							>
								<BanIcon class="w-4 h-4 text-white" />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</template>
