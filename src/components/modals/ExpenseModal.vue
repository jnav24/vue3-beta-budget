<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ExpenseForm from '@/components/partials/ExpenseForm.vue';
import Modal from '@/components/modals/Modal.vue';
import { BudgetExpense, BudgetList, useBudgetStore } from '@/store/budget';
import ExpenseFormProvider from '@/components/modals/ExpenseFormProvider';
import { useRoute } from 'vue-router';

export default defineComponent({
	components: {
		ExpenseForm,
		ExpenseFormProvider,
		Modal,
	},
	props: {
		data: {
			default: () => ({}),
			type: Object as () => BudgetExpense,
		},
		editMode: {
			default: false,
			type: Boolean,
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
		const budgetStore = useBudgetStore();
		const {
			params: { id },
		} = useRoute();

		const budgetCycle = ref('');
		const setClose = ref(false);

		const setCloseModal = (budget?: { type: string; data: BudgetList }) => {
			if (budget && Object.keys(budget.data).length) {
				emit('update-budget', budget);
			}

			setClose.value = true;
			setTimeout(() => (setClose.value = false), 1000);
		};

		watch(
			() => props.show,
			n => {
				if (n) {
					budgetCycle.value =
						budgetStore.list.find(item => item.id === Number(id))
							?.budget_cycle ?? '';
				}
			}
		);

		return {
			budgetCycle,
			closeModal: (e: boolean) => emit('update:show', e),
			setClose,
			setCloseModal,
		};
	},
});
</script>

<template>
	<Modal :show="show" :set-close="setClose" @close="closeModal($event)">
		<div :class="{ 'w-200': hideSidebar, 'w-250': !hideSidebar }">
			<ExpenseFormProvider
				:budget-cycle="budgetCycle"
				:data="data"
				:edit-mode="editMode"
				:type="type"
				:hide-sidebar="hideSidebar"
				@close-modal="setCloseModal($event)"
			>
				<ExpenseForm />
			</ExpenseFormProvider>
		</div>
	</Modal>
</template>
