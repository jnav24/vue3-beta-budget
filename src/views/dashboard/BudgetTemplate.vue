<script lang="ts">
import { defineComponent } from 'vue';
import BudgetTemplateTable from '@/components/tables/BudgetTemplateTable.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import SaveIcon from '@/components/ui-elements/icons/SaveIcon.vue';
import { useTemplateStore } from '@/store';

export default defineComponent({
	components: {
		BudgetTemplateTable,
		Button,
		SaveIcon,
	},
	setup() {
		const templateStore = useTemplateStore();
		return { expenses: templateStore.expenses };
	},
});
</script>

<template>
	<div class="container mx-auto">
		<div
			class="flex flex-col sm:flex-row justify-between items-center text-3xl border-b border-gray-400 mb-20 py-12 px-4 sm:px-0"
		>
			<div class="space-y-2 mr-0 sm:mr-64 mb-8 sm:mb-0">
				<h1 class="font-body text-gray-700">Budget Template</h1>
				<p class="text-base font-header text-gray-600">
					Add all your monthly expenses here! Whenever you create a
					new budget, the expenses here will automatically show in
					your new monthly budget. The idea is to not to manually
					enter the same info more than once.
				</p>
				<p class="text-base font-header text-gray-600">
					All you have to do is click on the 'Add Expense' button,
					select the type of expense, enter the details and save your
					changes.
				</p>
				<p class="text-base font-header text-gray-600">
					If you were to delete an item on this page, all already
					existing budgets will be unaffected.
				</p>
			</div>
			<Button class="w-full sm:w-auto" :is-disabled="true">
				<SaveIcon class="w-5 h-5 mr-2" />
				<span>Save</span>
			</Button>
		</div>

		<BudgetTemplateTable
			v-for="(item, key) in expenses"
			:key="key"
			:category="key"
			:data="item"
		/>
	</div>
</template>
