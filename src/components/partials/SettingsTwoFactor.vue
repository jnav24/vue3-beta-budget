<script lang="ts">
import { defineComponent } from 'vue';
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';
import useHttp from '@/hooks/useHttp';

export default defineComponent({
	components: {
		SettingsLayout,
	},
	setup() {
		const { postAuth, getAuth } = useHttp();

		const enableTwoFactor = async () => {
			const { state, data } = await postAuth({
				path: '/user/two-factor-authentication',
			});
		};

		const getQRCode = async () => {
			const { state, data } = await getAuth({
				path: '/user/two-factor-qr-code',
			});
		};

		const getRecoveryCodes = async () => {
			const { state, data } = await getAuth({
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
			hello
		</SettingsLayout>
	</section>
</template>
