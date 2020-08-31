<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { Form, Input } from '@/components/ui-elements';

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
		class="relative z-30 md:w-1/4 lg:w-1/4 xl:w-1/6 mt-6 pt-4 bg-white rounded-lg shadow-md overflow-hidden text-left"
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
		<div class="pb-6 px-6 shadow-sm">
			<h1 class="text-center text-2xl text-gray-600 font-header mb-8">
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
			class="py-4 px-6 bg-gray-100 flex flex-row justify-end items-center"
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
