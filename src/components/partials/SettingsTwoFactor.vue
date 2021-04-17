<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import ConfirmPasswordModal from '@/components/modals/ConfirmPasswordModal.vue';
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';
import Toggle from '@/components/ui-elements/form/Toggle.vue';
import useHttp from '@/hooks/useHttp';
import { useUserStore } from '@/store';

export default defineComponent({
	components: {
		ConfirmPasswordModal,
		SettingsLayout,
		Toggle,
	},
	setup() {
		const { postAuth, getAuth, deleteAuth } = useHttp();
		const userStore = useUserStore();
		const showConfirmPasswordModal = ref(false);
		const toggleState = ref(false);

		onMounted(() => {
			toggleState.value = userStore.user.mfa_enabled;
		});

		const disableTwoFactor = async () => {
			const { success, data } = await deleteAuth({
				path: '/user/two-factor-authentication',
			});
			console.log(success);
			console.log(data);
			if (success) {
				toggleState.value = false;
			}
		};

		const enableTwoFactor = async () => {
			const { success, data, error } = await postAuth({
				path: '/user/two-factor-authentication',
			});
			console.log(success);
			console.log(data);
			console.log(error);
			if (success) {
				toggleState.value = true;
			}

			if (error === 'Password confirmation required.') {
				showConfirmPasswordModal.value = true;
			}
		};

		const getQRCode = async () => {
			const { success, data } = await getAuth({
				path: '/user/two-factor-qr-code',
			});
		};

		const getRecoveryCodes = async () => {
			const { success, data } = await getAuth({
				path: '/user/two-factor-recovery-codes',
			});
		};

		const handleToggleClick = (e: boolean) => {
			if (e) {
				enableTwoFactor();
			} else {
				disableTwoFactor();
			}
		};

		return { showConfirmPasswordModal, handleToggleClick, toggleState };
	},
});
</script>

<template>
	<ConfirmPasswordModal
		v-model:show="showConfirmPasswordModal"
		@handle-confirm="handleToggleClick($event)"
	/>
	<section class="pt-12">
		<SettingsLayout
			title="Two Factor Authentication"
			description="Add additional security to your account by using two factor authentication"
		>
			<div
				class="flex flex-row justify-between items-center text-gray-700 mb-2"
			>
				<span>{{ toggleState ? 'Enabled' : 'Disabled' }}</span>
				<Toggle
					:value="toggleState"
					@handle-click="handleToggleClick($event)"
				/>
			</div>
			<p class="text-sm text-gray-500">
				*You will need an authenticator app like Authy or Google
				Authenticator to use two factor.
			</p>
		</SettingsLayout>
	</section>
</template>
