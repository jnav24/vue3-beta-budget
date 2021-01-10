<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from '@/components/modals/Modal.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';

export default defineComponent({
	components: {
		Modal,
		WarningIcon,
	},
	props: {
		show: {
			required: true,
			type: Boolean,
		},
		text: {
			default: 'Are you sure you want to remove this item?',
			type: String,
		},
		title: {
			default: 'Remove Item',
			type: String,
		},
	},
	setup(props, { emit }) {
		const setClose = ref(false);

		const setCloseModal = (e: boolean) => {
			if (e) {
				emit('confirm');
			}

			setClose.value = true;
			setTimeout(() => (setClose.value = false), 1000);
		};

		return {
			closeModal: (e: boolean) => emit('update:show', e),
			setClose,
			setCloseModal,
		};
	},
});
</script>

<template>
	<Modal :show="show" :set-close="setClose" @close="closeModal($event)">
		<div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
			<div class="sm:flex sm:items-start">
				<div
					class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
				>
					<WarningIcon class="h-6 w-6 text-red-600" />
				</div>

				<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
					<h3
						class="text-lg leading-6 font-medium text-gray-900"
						id="modal-headline"
					>
						{{ title }}
					</h3>
					<div class="mt-2">
						<p class="text-sm leading-5 text-gray-500">
							{{ text }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div
			class="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg"
		>
			<span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
				<button
					type="button"
					class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
					@click="setCloseModal(true)"
				>
					Remove
				</button>
			</span>
			<span
				class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
			>
				<button
					type="button"
					class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
					@click="setCloseModal(false)"
				>
					Cancel
				</button>
			</span>
		</div>
	</Modal>
</template>
