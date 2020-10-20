<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useTypesStore } from '@/store';
import useUtils from '@/hooks/useUtils';
import BankExpenseForm from '@/components/forms/BankExpenseForm.vue';
import SideBar from '@/components/partials/SideBar.vue';
import { BudgetExpense } from '@/store/budget';

export default defineComponent({
	components: {
		BankExpenseForm,
		SideBar,
	},
	props: {
		data: {
			default: () => ({}),
			type: Object as () => BudgetExpense,
		},
		type: {
			required: true,
			type: String,
		},
	},
	setup(props) {
		const typeStore = useTypesStore();
		const { toTitleCase } = useUtils();

		const categories = computed(() => typeStore.bills);
		const editMode = Object.keys(props.data).length;
		const formContent = ref(null);
		const selectedCategory = ref('banks');
		const selectedTitle = computed(() =>
			toTitleCase(selectedCategory.value)
		);

		return {
			categories,
			editMode,
			formContent,
			selectedCategory,
			selectedTitle,
		};
	},
});
</script>

<template>
	<div class="flex flex-row">
		<aside class="w-1/4 px-2 bg-gray-100 overflow-auto" v-if="editMode">
			<SideBar
				title="Categories"
				:items="categories"
				item-value="slug"
				item-label="name"
				v-model:selected-item="selectedCategory"
			/>
		</aside>

		<article class="flex-1 bg-white" ref="formContent">
			<h2 class="text-2xl text-gray-700 font-body mb-4 px-4 pt-2">
				Edit {{ selectedTitle }} Expense
			</h2>

			<BankExpenseForm />
		</article>
	</div>
</template>
