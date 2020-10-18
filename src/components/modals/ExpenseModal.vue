<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/modals/Modal.vue';

export default defineComponent({
	components: {
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
		<div class="w-300">
			<h1>Come One!</h1>
			<p>let's go</p>
		</div>
	</Modal>
</template>
