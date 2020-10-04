<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
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
		const valid = ref(false);
		const form = reactive({
			password: {
				rules: [],
				value: '',
			},
			confirm_password: {
				rules: [],
				value: '',
			},
		});

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
				Reset Password
			</h1>

			<Form v-model:valid="valid">
				<Input
					label="New Password"
					type="password"
					v-model:value="form.password.value"
					:rules="form.password.rules"
				/>
				<Input
					label="Confirm Password"
					type="password"
					v-model:value="form.confirm_password.value"
					:rules="form.confirm_password.rules"
				/>
				<Button :is-disabled="!valid" color="secondary">
					Reset Paassword
				</Button>
			</Form>
		</div>
	</div>
</template>
