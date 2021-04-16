<script lang="ts">
import { defineComponent } from 'vue';
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';
import useHttp from '@/hooks/useHttp';

export default defineComponent({
	components: {
		SettingsLayout,
	},
	setup() {
		const { postAuth, getAuth, deleteAuth } = useHttp();

		const disableTwoFactor = async () => {
			const { success, data } = await deleteAuth({
				path: '/user/two-factor-authentication',
			});
		};

		const enableTwoFactor = async () => {
			const { success, data } = await postAuth({
				path: '/user/two-factor-authentication',
			});
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

		return {};
	},
});
</script>

<template>
	<section class="pt-12">
		<SettingsLayout
			title="Two Factor Authentication"
			description="Add additional security to your account by using two factor authentication"
		>
			<div class="flex flex-row justify-between text-gray-700">
				<span>Enabled</span>
			</div>
			<p class="text-sm text-gray-500">
				*You will need an authenticator app like Authy or Google
				Authenticator to use two factor.
			</p>
		</SettingsLayout>
	</section>
</template>
