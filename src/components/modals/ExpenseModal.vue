<script lang="ts">
import { defineComponent } from 'vue';
import ExpenseForm from '@/components/partials/ExpenseForm.vue';
import Modal from '@/components/modals/Modal.vue';

export default defineComponent({
	components: {
		ExpenseForm,
		Modal,
	},
	props: {
		show: {
			require: true,
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
			<ExpenseForm />
		</div>
	</Modal>
</template>
