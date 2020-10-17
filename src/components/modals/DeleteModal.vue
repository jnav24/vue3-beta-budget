<script lang="ts">
import { defineComponent } from 'vue';
import Modal from '@/components/modals/Modal.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';

export default defineComponent({
	components: {
		Modal,
		WarningIcon,
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
		<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
						Deactivate account
					</h3>
					<div class="mt-2">
						<p class="text-sm leading-5 text-gray-500">
							Are you sure you want to deactivate your account?
							All of your data will be permanently removed. This
							action cannot be undone.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
			<span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
				<button
					type="button"
					class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
				>
					Deactivate
				</button>
			</span>
			<span
				class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
			>
				<button
					type="button"
					class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
				>
					Cancel
				</button>
			</span>
		</div>
	</Modal>
</template>
