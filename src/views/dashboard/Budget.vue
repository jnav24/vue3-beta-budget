<script lang="ts">
import { defineComponent, ref } from 'vue';
import AddIcon from '@/components/ui-elements/icons/AddIcon.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import ChevronDownIcon from '@/components/ui-elements/icons/ChevronDownIcon.vue';
import EditIcon from '@/components/ui-elements/icons/EditIcon.vue';
import SubNav from '@/components/partials/SubNav.vue';
import SubNavItems from '@/components/partials/SubNavItems.vue';

export default defineComponent({
	components: {
		AddIcon,
		Button,
		Card,
		ChevronDownIcon,
		EditIcon,
		SubNav,
		SubNavItems,
	},
	setup() {
		const addBudgetItems = [
			{ value: '', label: 'Monthly Budget', icon: 'CalendarIcon' },
			{ value: '', label: 'Blank Budget', icon: 'ArchiveIcon' },
		];
		const showAddBudgetNav = ref(false);

		return { addBudgetItems, showAddBudgetNav };
	},
});
</script>

<template>
	<div class="container mx-auto py-6">
		<div class="flex flex-row items-center justify-end">
			<Button>
				<EditIcon class="w-4 h-4 mr-2" />
				<span>Edit Template</span>
			</Button>

			<SubNav>
				<Button
					@on-click="showAddBudgetNav = !showAddBudgetNav"
					@blur="showAddBudgetNav = false"
				>
					<AddIcon class="w-5 h-5 mr-2" />
					<span>Add Budget</span>
					<span
						class="border-l border-dark-primary border-opacity-25 ml-4 pl-4"
					>
						<ChevronDownIcon class="w-5 h-5" />
					</span>
				</Button>

				<SubNavItems :items="addBudgetItems" :show="showAddBudgetNav" />
			</SubNav>
		</div>

		<div class="grid grid-cols-4 gap-3">
			<Card class="col-span-3">Hello</Card>
			<div>Motto</div>
		</div>
	</div>
</template>
