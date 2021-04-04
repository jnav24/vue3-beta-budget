<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import CardFooter from '@/components/ui-elements/card/CardFooter.vue';
import { Form } from '@/components/ui-elements';
import InlineAlert from '@/components/ui-elements/InlineAlert.vue';
import Input from '@/components/ui-elements/form/Input.vue';
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';
import useHttp from '@/hooks/useHttp';

export default defineComponent({
	components: {
		Button,
		CardFooter,
		Form,
		InlineAlert,
		Input,
		SettingsLayout,
	},
	setup() {
		const { putAuth } = useHttp();

		const form = reactive({
			current_password: {
				rules: ['required'],
				value: '',
			},
			confirm_password: {
				rules: ['required', 'match:new-password'],
				value: '',
			},
			new_password: {
				rules: ['required', 'min:8', 'alpha-numeric'],
				value: '',
			},
		});
		const isSuccess = ref(false);
		const showAlert = ref(false);
		const valid = ref(false);

		const handleSave = async () => {
			const response = await putAuth({
				path: 'user/password',
				params: {
					current_password: form.current_password.value,
					password: form.new_password.value,
					password_confirmation: form.confirm_password.value,
				},
			});

			isSuccess.value = response.success ?? false;

			if (response.success) {
				form.current_password.value = '';
				form.new_password.value = '';
				form.confirm_password.value = '';
				valid.value = false;
			}

			showAlert.value = true;
		};

		return { form, handleSave, isSuccess, showAlert, valid };
	},
});
</script>

<template>
	<SettingsLayout
		title="Update Password"
		description="Ensure your account is using a long, random password to stay secure."
	>
		<Form v-model:valid="valid">
			<Input
				label="Current Password"
				type="password"
				v-model:value="form.current_password.value"
				:rules="form.current_password.rules"
			/>

			<Input
				label="New Password"
				type="password"
				v-model:value="form.new_password.value"
				:rules="form.new_password.rules"
			/>

			<Input
				label="Confirm Password"
				type="password"
				v-model:value="form.confirm_password.value"
				:rules="form.confirm_password.rules"
			/>

			<CardFooter
				class="flex flex-row justify-end items-center"
				style="padding-right: 0;"
			>
				<InlineAlert v-model:show="showAlert" :is-success="isSuccess" />
				<Button
					color="secondary"
					:is-disabled="!valid"
					@click="handleSave()"
				>
					Save
				</Button>
			</CardFooter>
		</Form>
	</SettingsLayout>
</template>
