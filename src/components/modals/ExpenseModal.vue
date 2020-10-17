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
});
</script>

<template>
	<Modal>
		<div class="w-300">
			woah!!
		</div>
	</Modal>
</template>
