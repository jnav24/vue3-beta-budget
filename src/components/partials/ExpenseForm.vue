<script lang="ts">
import { computed, defineComponent, inject, nextTick, ref, watch } from 'vue';
import { useTypesStore } from '@/store';
import useUtils from '@/hooks/useUtils';
import BankExpenseForm from '@/components/forms/BankExpenseForm.vue';
import CommonExpenseForm from '@/components/forms/CommonExpenseForm.vue';
import CreditCardExpenseForm from '@/components/forms/CreditCardExpenseForm.vue';
import IncomeExpenseForm from '@/components/forms/IncomeExpenseForm.vue';
import MiscellaneousExpenseForm from '@/components/forms/MiscellaneousExpenseForm.vue';
import VehicleExpenseForm from '@/components/forms/VehicleExpenseForm.vue';
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
		VehicleExpenseForm,
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
		const formType = computed(() => ExpenseContext.currentType.value);
		const selectedCategory = ref('' as keyof TypesStateInterface);
		const selectedTitle = computed(() =>
			toTitleCase(selectedCategory.value)
		);

		nextTick(() => {
			if (!ExpenseContext.editMode.value) {
				selectedCategory.value = 'banks';
			}
		});

		watch(selectedCategory, () => {
			ExpenseContext.currentType.value = selectedCategory.value;

			nextTick(() => {
				formHeight.value = (formContent.value as any)?.offsetHeight;
			});
		});

		return {
			categories,
			editMode: ExpenseContext.editMode,
			formContent,
			formHeight,
			formType,
			selectedCategory,
			selectedTitle,
		};
	},
});
</script>

<template>
	<div class="flex flex-row">
		<aside
			class="w-1/4 px-2 bg-gray-100 overflow-auto rounded-l-md"
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

		<article class="flex-1 bg-white rounded-md overflow-hidden">
			<div ref="formContent">
				<h2 class="text-2xl text-gray-700 font-body mb-4 px-4 pt-2">
					<template v-if="editMode">Edit</template>
					<template v-if="!editMode">
						Add {{ selectedTitle }}
					</template>
					Expense
				</h2>

				<BankExpenseForm
					v-if="['banks', 'investments'].includes(formType)"
				/>
				<CreditCardExpenseForm
					v-else-if="['credit-cards'].includes(formType)"
				/>
				<IncomeExpenseForm v-else-if="['incomes'].includes(formType)" />
				<MiscellaneousExpenseForm
					v-else-if="['miscellaneous'].includes(formType)"
				/>
				<VehicleExpenseForm
					v-else-if="['vehicles'].includes(formType)"
				/>
				<CommonExpenseForm v-else />
			</div>
		</article>
	</div>
</template>
