<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import ExpenseForm from '@/components/partials/ExpenseForm.vue';
import Modal from '@/components/modals/Modal.vue';
import { BudgetExpense, BudgetList } from '@/store/budget';
import ExpenseFormProvider from '@/components/modals/ExpenseFormProvider';

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
	<Modal :show="show" :set-close="setClose" @close="closeModal($event)">
		<div :class="{ 'w-200': hideSidebar, 'w-250': !hideSidebar }">
			<ExpenseFormProvider
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
