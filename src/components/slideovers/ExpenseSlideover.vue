<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Slideover from '@/components/slideovers/Slideover.vue';
import { BudgetExpense, BudgetList } from '@/store/budget';
import ExpenseForm from '@/components/partials/ExpenseForm.vue';
import ExpenseFormProvider from '@/components/modals/ExpenseFormProvider';

export default defineComponent({
	components: {
		ExpenseForm,
		ExpenseFormProvider,
		Slideover,
	},
	props: {
		data: {
			default: () => ({}),
			type: Object as () => BudgetExpense,
		},
		hideSidebar: {
			default: false,
			type: Boolean,
		},
		show: {
			required: true,
			type: Boolean,
		},
		type: {
			required: true,
			type: String,
		},
	},
	setup(props, { emit }) {
		const setClose = ref(false);

		const setCloseModal = (budget?: BudgetList) => {
			if (budget && Object.keys(budget).length) {
				emit('update-budget', budget);
			}

			setClose.value = true;
			setTimeout(() => (setClose.value = false), 1000);
		};

		return {
			closeModal: (e: boolean) => emit('update:show', e),
			editMode: computed(() => !!Object.keys(props.data).length),
			setClose,
			setCloseModal,
		};
	},
});
</script>

<template>
	<Slideover :show="show" :set-close="setClose" @close="closeModal($event)">
		<ExpenseFormProvider
			:data="data"
			:edit-mode="editMode"
			:type="type"
			:hide-sidebar="hideSidebar"
			@close-modal="setCloseModal($event)"
		>
			<ExpenseForm />
		</ExpenseFormProvider>
	</Slideover>
</template>
