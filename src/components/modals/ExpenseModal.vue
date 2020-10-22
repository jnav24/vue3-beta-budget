<script lang="ts">
import { computed, defineComponent } from 'vue';
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
			editMode: computed(() => !!Object.keys(props.data).length),
			closeModal: (e: boolean) => emit('update:show', e),
		};
	},
});
</script>

<template>
	<Modal :show="show" @close="closeModal($event)">
		<div :class="{ 'w-150': editMode, 'w-300': !editMode }">
			<ExpenseFormProvider :data="data" @close-modal="closeModal($event)">
				<ExpenseForm :edit-mode="editMode" />
			</ExpenseFormProvider>
		</div>
	</Modal>
</template>
