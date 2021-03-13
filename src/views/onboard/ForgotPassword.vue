<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { Form } from '@/components/ui-elements';
import Alert from '@/components/ui-elements/Alert.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Input from '@/components/ui-elements/form/Input.vue';
import useHttp from '@/hooks/useHttp';

export default defineComponent({
	components: {
		Alert,
		Button,
		Form,
		Input,
	},
	setup() {
		const { get, post } = useHttp();

		const disableSubmit = ref(false);
		const emailSent = ref(false);
		const error = reactive({
			display: false,
			message: '',
		});
		const form = reactive({
			email: {
				rules: ['required', 'email'],
				value: '',
			},
		});
		const valid = ref(false);

		const handleSubmit = async () => {
			await get({ path: 'sanctum/csrf-cookie' });
			const response = await post({
				path: 'forgot-password',
				params: {
					email: form.email.value,
				},
			});

			if (response.success) {
				error.display = false;
				error.message = '';
				emailSent.value = true;
			} else {
				error.display = true;
				error.message = response.error;
				disableSubmit.value = false;
			}
		};

		return { disableSubmit, emailSent, error, form, handleSubmit, valid };
	},
});
</script>

<template>
	<div class="pb-6 px-0 sm:px-6 sm:shadow-sm">
		<template v-if="!emailSent">
			<h1
				class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header"
			>
				Forgot Password?
			</h1>

			<p class="text-sm text-center text-gray-600 mb-8">
				Enter your email and we will send you a link with instructions
				on resetting your password.
			</p>

			<Alert type="error" :message="error.message" v-if="error.display" />

			<Form v-model:valid="valid">
				<Input
					label="Email"
					v-model:value="form.email.value"
					:rules="form.email.rules"
				/>

				<Button
					:is-disabled="!valid || disableSubmit"
					color="secondary"
					@click="handleSubmit()"
				>
					Send
				</Button>
			</Form>
		</template>

		<template v-if="emailSent">
			<h1
				class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header"
			>
				Email Sent!
			</h1>

			<p class="text-sm text-center text-gray-600 mb-8">
				An email containing your password recovery link has been sent.
				If you do not see the email in your inbox, check your spam
				folder.
			</p>
		</template>
	</div>

	<div
		class="py-4 px-6 sm:bg-gray-100 flex flex-row justify-center sm:justify-end items-center"
	>
		<router-link
			class="text-gray-700 underline text-sm hover:no-underline"
			:to="{ name: 'login' }"
		>
			Login
		</router-link>
	</div>
</template>
