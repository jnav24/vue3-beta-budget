<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import Modal from '@/components/modals/Modal.vue';
import { useUserStore } from '@/store';
import useStates from '@/hooks/useStates';

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
	setup(props) {
		const userStore = useUserStore();
		const { path } = useRoute();
		const { push } = useRouter();

		const form = reactive({
			email: {
				rules: ['required', 'email'],
				value: '',
			},
			password: {
				rules: {
					required: 'Password is required',
				},
				value: '',
			},
		});
		const isValid = ref(false);
		const setClose = ref(false);
		const showModal = ref(false);

		const login = async () => {
			const response = await userStore.logUserIn({
				username: form.email.value,
				password: form.password.value,
			});

			if (response.success && form.email.value !== userStore.user.email) {
				const { logout } = useStates();
				logout();
				if (path === '/dashboard') {
					location.reload();
				} else {
					push({ name: 'dashboard' });
				}
			}
		};

		const setCloseModal = () => {
			setClose.value = true;
			setTimeout(() => {
				setClose.value = false;
				showModal.value = false;
			}, 1000);
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
			form,
			isValid,
			login,
			setClose,
			setCloseModal,
			showModal,
		};
	},
});
</script>

<template>
	<Modal :show="showModal" :set-close="setClose" persistent>
		<div class="w-100">
			<div class="px-4 pt-4">
				<h2 class="text-xl">Session Expired</h2>
				<p class="text-sm text-gray-700 mb-6">
					Your session has timed out. Please re-enter your password to
					continue or sign into another account.
				</p>

				<Form v-model:valid="isValid">
					<Input
						label="Email"
						v-model:value="form.email.value"
						:rules="form.email.rules"
					/>
					<Input
						label="Password"
						type="password"
						v-model:value="form.password.value"
						:rules="form.password.rules"
					/>
				</Form>
			</div>

			<div class="flex flex-row justify-end px-2 py-4">
				<Button
					color="secondary"
					:is-disabled="!isValid"
					@click="login()"
				>
					Login
				</Button>
			</div>
		</div>
	</Modal>
</template>
