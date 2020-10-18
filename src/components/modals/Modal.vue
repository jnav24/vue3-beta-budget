<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		show: {
			require: true,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		return {
			closeModal: (e: boolean) => emit('close', e),
		};
	},
});
</script>

<style>
.modal-enter-active,
.modal-leave-active {
	@apply transition-opacity duration-500 ease-out;
}

.modal-enter-from,
.modal-leave-to {
	@apply opacity-0;
}
</style>

<template>
	<transition name="modal">
		<div class="fixed z-100 inset-0 overflow-y-auto" v-if="show">
			<div
				class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
			>
				<div class="fixed inset-0">
					<div class="absolute inset-0 bg-gray-900 opacity-75" @click="closeModal(false)"></div>
				</div>

				<!-- This element is to trick the browser into centering the modal contents. -->
				<span
					class="hidden sm:inline-block sm:align-middle sm:h-screen"
				></span>
				&#8203;
			</div>
		</div>
	</transition>
</template>
