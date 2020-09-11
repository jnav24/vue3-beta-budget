<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { Form } from '@/components/ui-elements';
import Input from '@/components/ui-elements/form/Input.vue';

export default defineComponent({
	components: {
		Form,
		Input,
	},
	setup() {
		const form = reactive({
			email: {
				rules: {
					required: 'Email is required',
					email: 'Must be a valid email',
				},
				value: '',
			},
			password: {
				rules: {
					required: 'Password is required',
				},
				value: '',
			},
		});
		const valid = ref(false);

		return { form, valid };
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
			<h1
				class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8"
			>
				Welcome Back
			</h1>
			<Form v-model:valid="valid">
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
				<button
					class="w-full py-2 rounded"
					type="button"
					:disabled="!valid"
					:class="{
						'bg-secondary shadow-md': valid,
						'bg-gray-300 text-gray-600': !valid,
					}"
				>
					Login
				</button>
			</Form>
		</div>
		<div
			class="py-4 px-6 sm:bg-gray-100 flex flex-row justify-center sm:justify-end items-center"
		>
			<router-link
				class="text-gray-700 underline text-sm hover:no-underline"
				to="/"
			>
				Forgot Password?
			</router-link>
		</div>
	</div>
</template>
