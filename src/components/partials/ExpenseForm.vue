<script lang="ts">
import { computed, defineComponent, inject, nextTick, ref } from 'vue';
import { useTypesStore } from '@/store';
import useUtils from '@/hooks/useUtils';
import BankExpenseForm from '@/components/forms/BankExpenseForm.vue';
import CommonExpenseForm from '@/components/forms/CommonExpenseForm.vue';
import CreditCardExpenseForm from '@/components/forms/CreditCardExpenseForm.vue';
import IncomeExpenseForm from '@/components/forms/IncomeExpenseForm.vue';
import MiscellaneousExpenseForm from '@/components/forms/MiscellaneousExpenseForm.vue';
import VehicleExpenseForm from '@/components/forms/VehicleExpenseForm.vue';
import SideBar from '@/components/partials/SideBar.vue';
import Select from '@/components/ui-elements/form/Select.vue';
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
		Select,
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
		const selectedTitle = computed(() => toTitleCase(formType.value));

		const setCategory = (category: keyof TypesStateInterface) => {
			ExpenseContext.currentType.value = category;
			nextTick(() => {
				formHeight.value = (formContent.value as any)?.offsetHeight;
			});
		};

		nextTick(() => {
			formHeight.value = (formContent.value as any)?.offsetHeight;
		});

		return {
			categories,
			editMode: ExpenseContext.editMode,
			formContent,
			formHeight,
			formType,
			hideSidebar: ExpenseContext.hideSidebar,
			selectedTitle,
			setCategory,
		};
	},
});
</script>

<template>
	<div class="flex flex-row">
		<aside
			class="w-1/4 px-2 bg-gray-100 overflow-auto rounded-l-md hidden lg:block"
			v-if="!hideSidebar"
			:style="`height: ${formHeight}px`"
		>
			<SideBar
				title="Categories"
				:items="categories"
				item-value="slug"
				item-label="name"
				:selected-item="formType"
				@set-item="setCategory($event)"
			/>
		</aside>

		<article class="flex-1">
			<div
				ref="formContent"
				class="flex flex-col min-h-screen lg:min-h-0 pt-16 lg:pt-0"
			>
				<h2
					class="text-2xl text-gray-700 font-body mb-4 px-4 pt-2 absolute lg:relative top-0 left-0 w-full bg-white lg:bg-opacity-0"
				>
					<template v-if="editMode">Edit</template>
					<template v-if="!editMode">
						Add {{ selectedTitle }}
					</template>
					Expense
				</h2>

				<Select
					v-if="!hideSidebar"
					class="block lg:hidden mx-4 mb-6"
					label="Categories"
					:items="categories"
					item-value="slug"
					item-label="name"
					:value="formType"
					@set-item="setCategory($event)"
				/>

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
					@update-category="setCategory('vehicles')"
				/>
				<CommonExpenseForm v-else />
			</div>
		</article>
	</div>
</template>
