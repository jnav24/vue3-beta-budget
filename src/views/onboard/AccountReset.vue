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
				rules: ['required', 'min:8', 'alpha-numeric', 'upper'],
				value: '',
			},
			confirm_password: {
				rules: ['required', 'match:new-password'],
				value: '',
			},
		});

		return { form, valid };
	},
});
</script>

<template>
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
</template>
