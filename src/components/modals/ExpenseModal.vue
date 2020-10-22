<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
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
		const setClose = ref(false);

		const setCloseModal = (e: boolean) => {
			setClose.value = !e;
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
		<div :class="{ 'w-150': editMode, 'w-300': !editMode }">
			<ExpenseFormProvider
				:data="data"
				@close-modal="setCloseModal($event)"
			>
				<ExpenseForm :edit-mode="editMode" />
			</ExpenseFormProvider>
		</div>
	</Modal>
</template>
