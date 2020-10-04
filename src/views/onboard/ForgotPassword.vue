<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { Form } from '@/components/ui-elements';
import Button from '@/components/ui-elements/form/Button.vue';
import Input from '@/components/ui-elements/form/Input.vue';

export default defineComponent({
	components: {
		Button,
		Form,
		Input,
	},
	setup() {
		const emailSent = ref(true);
		const form = reactive({
			email: {
				rules: ['required', 'email'],
				value: '',
			},
		});
		const valid = ref(false);

		return { emailSent, form, valid };
	},
});
</script>

<template>
	<div
		class="relative z-30 w-full sm:w-100 mt-6 px-4 sm:px-0 pt-4 sm:bg-white sm:rounded-lg sm:shadow-md overflow-hidden text-left"
	>
		<div class="flex flex-row justify-center mb-4">
			<div class="overflow-hidden h-16 w-16">
				<img
					src="@/assets/logo_1.png"
					alt="Dime Budget"
					style="max-width: 12rem;"
					class="crisp h-full w-64"
				/>
			</div>
		</div>

		<div class="pb-6 px-0 sm:px-6 sm:shadow-sm">
			<template v-if="!emailSent">
				<h1
					class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header"
				>
					Forgot Password?
				</h1>
				<p class="text-sm text-center text-gray-600 mb-8">
					Enter your email and we will send you a link with
					instructions on resetting your password.
				</p>

				<Form v-model:valid="valid">
					<Input
						label="Email"
						v-model:value="form.email.value"
						:rules="form.email.rules"
					/>

					<Button :is-disabled="!valid" color="secondary">
						Reset Password
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
					An email containing your password recovery link has been
					sent. If you do not see the email in your inbox, check your
					spam folder.
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
	</div>
</template>
