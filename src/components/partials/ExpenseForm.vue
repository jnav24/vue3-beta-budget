<script lang="ts">
import { computed, defineComponent, inject, nextTick, ref, watch } from 'vue';
import { useTypesStore } from '@/store';
import useUtils from '@/hooks/useUtils';
import BankExpenseForm from '@/components/forms/BankExpenseForm.vue';
import CommonExpenseForm from '@/components/forms/CommonExpenseForm.vue';
import CreditCardExpenseForm from '@/components/forms/CreditCardExpenseForm.vue';
import IncomeExpenseForm from '@/components/forms/IncomeExpenseForm.vue';
import MiscellaneousExpenseForm from '@/components/forms/MiscellaneousExpenseForm.vue';
import SideBar from '@/components/partials/SideBar.vue';
import {
	ExpenseFormContext,
	ExpenseFormContextType,
} from '@/components/modals/ExpenseFormProvider';
import { TypesStateInterface } from '@/store/types';

export default defineComponent({
	components: {
		BankExpenseForm,
		CommonExpenseForm,
		CreditCardExpenseForm,
		IncomeExpenseForm,
		MiscellaneousExpenseForm,
		SideBar,
	},
	setup() {
		const typeStore = useTypesStore();
		const { toTitleCase } = useUtils();

		const ExpenseContext = inject<ExpenseFormContextType>(
			ExpenseFormContext,
			{} as ExpenseFormContextType
		);

		const categories = computed(() => typeStore.bills);
		const formContent = ref(null);
		const formHeight = ref(0);
		const selectedCategory = ref('' as keyof TypesStateInterface);
		const selectedTitle = computed(() =>
			toTitleCase(selectedCategory.value)
		);

		nextTick(() => (selectedCategory.value = 'banks'));

		watch(selectedCategory, () => {
			ExpenseContext.currentType.value = selectedCategory.value;
			formHeight.value = (formContent.value as any)?.offsetHeight;
		});

		return {
			categories,
			editMode: ExpenseContext.editMode,
			formContent,
			formHeight,
			formType: ExpenseContext.currentType,
			selectedCategory,
			selectedTitle,
		};
	},
});
</script>

<template>
	<div class="flex flex-row">
		<aside
			class="w-1/4 px-2 bg-gray-100 overflow-auto"
			v-if="!editMode"
			:style="`height: ${formHeight}px`"
		>
			<SideBar
				title="Categories"
				:items="categories"
				item-value="slug"
				item-label="name"
				v-model:selected-item="selectedCategory"
			/>
		</aside>

		<article class="flex-1 bg-white">
			<div ref="formContent">
				<h2 class="text-2xl text-gray-700 font-body mb-4 px-4 pt-2">
					<template v-if="editMode">Edit</template>
					<template v-if="!editMode">
						Add {{ selectedTitle }}
					</template>
					Expense
				</h2>

				<!-- @todo show/hide forms -->
				<BankExpenseForm />
				<CommonExpenseForm v-if="formType === 'banks11'" />
				<CreditCardExpenseForm v-if="formType === 'banks11'" />
				<IncomeExpenseForm v-if="formType === 'banks11'" />
				<MiscellaneousExpenseForm v-if="formType === 'banks11'" />
			</div>
		</article>
	</div>
</template>
