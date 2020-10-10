<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Alert from '@/components/ui-elements/Alert.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import LoaderIcon from '@/components/ui-elements/icons/LoaderIcon.vue';
import useHttp from '@/hooks/useHttp';
import useTimestamp from '@/hooks/useTimestamp';
import { useUserStore } from '@/store';

export default defineComponent({
	components: {
		Alert,
		Button,
		Form,
		Input,
		LoaderIcon,
	},
	setup() {
		const { loading, post } = useHttp();
		const { unix } = useTimestamp();
		const { push } = useRouter();
		const { params } = useRoute();
		const userStore = useUserStore();

		const alert = reactive({
			display: false,
			message: '',
			type: '',
		});
		const expired = ref(false);
		const form = reactive({
			verify: {
				rules: ['required', 'max:6', 'alpha-numeric'],
				value: '',
			},
		});
		const valid = ref(false);

		onMounted(() => {
			expired.value = unix() > unix(userStore.login.verify.expires_at);
		});

		const submitVerify = async () => {
			const data = {
				path: `auth/submit-verify`,
				params: {
					id: userStore.user.id,
					token: params.token,
					verify: form.verify.value,
				},
			};
			const response = await post(data);

			if (response.success) {
				push({ name: 'home' });
				return true;
			}

			expired.value = response.error.includes('expired');
			alert.message = response.error;
			alert.type = 'error';
			alert.display = true;
		};

		const resendEmail = async () => {
			const data = {
				path: `auth/resend-verify`,
				params: {
					id: userStore.user.id,
					token: params.token,
				},
			};
			const response = await post(data);

			if (response.success) {
				alert.display = true;
				alert.message =
					'Email sent! If email is not in your inbox, check your spam folder.';
				alert.type = 'success';
			} else {
				alert.display = true;
				alert.message = 'Unable to resend email at this time';
				alert.type = 'error';
			}
		};

		return {
			alert,
			expired,
			form,
			loading,
			resendEmail,
			submitVerify,
			valid,
		};
	},
});
</script>

<template>
	<div class="pb-6 px-0 sm:px-6 sm:shadow-sm">
		<h1
			class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8"
		>
			Verify your device
		</h1>

		<Alert
			:type="alert.type"
			:message="alert.message"
			v-if="alert.display"
		/>

		<template v-if="!expired">
			<p class="text-sm text-center text-gray-600 mb-8">
				This device isn't recognized. We have sent you an email to your
				email address on file. For your security, enter the your
				verification code, from the email, in order to continue.
			</p>

			<Form v-model:valid="valid">
				<Input
					label="Enter Your Verification Code"
					v-model:value="form.verify.value"
					:rules="form.verify.rules"
				/>
				<Button :is-disabled="!valid" color="secondary">
					<LoaderIcon
						v-if="loading"
						class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600"
					/>
					<span v-if="!loading">Submit</span>
				</Button>
			</Form>
		</template>

		<template v-if="expired">
			<p class="text-sm text-center text-gray-600 mb-8">
				It still looks like you need to verify your current device.
				Unfortunately, this page has expired. Click on the button below
				and we will send you a new verification code to the email on
				file.
			</p>
			<Button color="secondary">Resend Email</Button>
		</template>
	</div>
</template>
