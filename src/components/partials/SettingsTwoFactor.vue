<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
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
		const qrCode = ref('');
		const recoveryCodes = ref<string[]>([]);
		const showConfirmPasswordModal = ref(false);
		const toggleState = computed(() => userStore.user.mfa_enabled);

		const disableTwoFactor = async () => {
			const { success } = await deleteAuth({
				path: '/user/two-factor-authentication',
			});

			if (success) {
				qrCode.value = '';
				recoveryCodes.value = [];
				userStore.setMfa(false);
			}
		};

		const getQRCode = async () => {
			const { success, data } = await getAuth({
				path: '/user/two-factor-qr-code',
			});

			if (success) {
				qrCode.value = data?.svg;
			}
		};

		const getRecoveryCodes = async () => {
			const { success, data } = await getAuth({
				path: '/user/two-factor-recovery-codes',
			});

			if (success) {
				recoveryCodes.value = data;
			}
		};

		const enableTwoFactor = async () => {
			const { success, error } = await postAuth({
				path: '/user/two-factor-authentication',
			});

			if (success) {
				userStore.setMfa(true);
				getQRCode();
				getRecoveryCodes();
			}

			if (error === 'Password confirmation required.') {
				showConfirmPasswordModal.value = true;
			}
		};

		const handleToggleClick = (e: boolean) => {
			if (e) {
				enableTwoFactor();
			} else {
				disableTwoFactor();
			}
		};

		return {
			showConfirmPasswordModal,
			handleToggleClick,
			qrCode,
			recoveryCodes,
			toggleState,
		};
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
			<div class="border-t border-gray-300 mt-4">
				<p class="text-danger mt-4 text-sm">
					Note: The information below will only be shown once.
				</p>
				<div class="flex flex-row mt-4 mb-8">
					<div class="text-gray-700 text-sm mr-4 space-y-4">
						<p>
							Two factor authentication is now enabled. Scan the
							following QR Code using your phone's authenticator
							application.
						</p>
						<p>
							While two factor authentication is enabled, you will
							be prompted for a secure random token during
							authentication. You may retrieve this token from
							your phone's Google Authenticator app.
						</p>
					</div>
					<div v-html="qrCode"></div>
				</div>
				<p class="text-gray-700 text-sm mb-2">
					Store these recovery codes in a secure password manager.
					They can be used to recover access to your account if your
					two factor authentication device is lost.
				</p>
				<div
					class="flex flex-row justify-between text-gray-700 bg-gray-200 border border-gray-300 py-2 pl-8 pr-4"
				>
					<ul v-for="(v, i) in [1, 2]" :key="i">
						<li
							class="list-disc mb-2 text-sm"
							v-for="(code, index) in [...recoveryCodes].splice(
								i * 4,
								v * 4
							)"
							:key="index"
						>
							{{ code }}
						</li>
					</ul>
				</div>
			</div>
		</SettingsLayout>
	</section>
</template>
