<script lang="ts">
import { defineComponent } from 'vue';

import Button from '@/components/ui-elements/form/Button.vue';
import useHttp from '@/hooks/useHttp';
import useStates from '@/hooks/useStates';

export default defineComponent({
	components: {
		Button,
	},
	setup() {
		const { get, post } = useHttp();
		const { logout } = useStates();

		const handleLogout = () => logout();

		const handleSendVerification = () => {
			await get({ path: 'sanctum/csrf-cookie' });
			const response = post({
				path: 'email/verification-notification',
			});

			if (response.success) {
				// ...
			}
		};

		return {
			handleLogout,
			handleSendVerification,
		};
	},
});
</script>

<template>
	<div class="pb-6 px-0 sm:px-6 sm:shadow-sm">
		<h1
			class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8"
		>
			Thanks for signing up!
		</h1>

		<div class="px-4 pb-4">
			<p class="text-sm text-gray-700 mb-8 text-center">
				Before getting started, could you verify your email address by
				clicking on the link we just emailed to you? If you didn't
				receive the email, we will gladly send you another.
			</p>

			<div class="space-y-2">
				<Button
					block
					color="secondary"
					@click="handleSendVerification()"
				>
					Resend Verification Email
				</Button>

				<Button block @click="handleLogout()">
					Logout
				</Button>
			</div>
		</div>
	</div>
</template>
