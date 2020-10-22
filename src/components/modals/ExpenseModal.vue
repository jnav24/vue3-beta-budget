<script lang="ts">
import { defineComponent } from 'vue';
import ExpenseForm from '@/components/partials/ExpenseForm.vue';
import Modal from '@/components/modals/Modal.vue';
import { BudgetExpense } from '@/store/budget';
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
		show: {
			required: true,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		return {
			closeModal: (e: boolean) => emit('update:show', e),
		};
	},
});
</script>

<template>
	<Modal :show="show" @close="closeModal($event)">
		<div class="w-100">
			<ExpenseFormProvider :data="data" @close-modal="closeModal($event)">
				<ExpenseForm :edit-mode="Object.keys(data).length"/>
			</ExpenseFormProvider>
		</div>
	</Modal>
</template>
