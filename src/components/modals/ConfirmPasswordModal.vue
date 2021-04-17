<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import Modal from '@/components/modals/Modal.vue';
import useHttp from '@/hooks/useHttp';

export default defineComponent({
	components: {
		Button,
		Form,
		Input,
		Modal,
	},
	props: {
		show: {
			required: true,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const { postAuth } = useHttp();
		const passwordField = ref('');
		const setClose = ref(false);
		const showModal = ref(false);
		const isValid = ref(false);

		const setCloseModal = () => {
			setClose.value = true;
			setTimeout(() => {
				setClose.value = false;
				showModal.value = false;
			}, 250);
		};

		const handleConfirmPassword = async () => {
			const { error, success, data } = await postAuth({
				path: '/user/confirm-password',
				params: {
					password: passwordField.value,
				},
			});
			console.log(data);
			console.log(error);
			console.log(success);
			if (success) {
				emit('handle-confirm', true);
				setCloseModal();
			}
			// if error, show the alert and keep modal open
		};

		watch(
			() => props.show,
			show => {
				if (show) {
					showModal.value = true;
				} else {
					setCloseModal();
				}
			}
		);

		return {
			closeModal: (e: boolean) => emit('update:show', e),
			handleConfirmPassword,
			passwordField,
			setClose,
			setCloseModal,
			showModal,
			isValid,
		};
	},
});
</script>

<template>
	<Modal :show="showModal" :set-close="setClose" @close="closeModal($event)">
		<div class="w-100">
			<div class="px-4 pt-4">
				<h2 class="text-xl">Confirm Your Password</h2>
				<p class="text-sm text-gray-700 mb-6">
					In order to perform this action, you must confirm your
					password.
				</p>
				<Form v-model:valid="isValid">
					<Input
						label="Password"
						v-model:value="passwordField"
						:rules="['required']"
						type="password"
					/>
				</Form>
			</div>

			<div class="flex flex-row justify-end px-2 py-4">
				<Button @click="setCloseModal(false)">Cancel</Button>
				<Button
					color="secondary"
					:is-disabled="!isValid"
					@click="handleConfirmPassword()"
				>
					Confirm
				</Button>
			</div>
		</div>
	</Modal>
</template>
