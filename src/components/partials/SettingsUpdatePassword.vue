<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import { Form } from '@/components/ui-elements';
import Input from '@/components/ui-elements/form/Input.vue';
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';

export default defineComponent({
	components: {
		Button,
		Form,
		Input,
		SettingsLayout,
	},
	setup() {
		const form = reactive({
			current_password: {
				rules: [],
				value: '',
			},
			confirm_password: {
				rules: [],
				value: '',
			},
			new_password: {
				rules: [],
				value: '',
			},
		});
		const valid = ref(false);

		return { form, valid };
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

			<Button
				color="secondary"
			>
				Save
			</Button>
		</Form>
	</SettingsLayout>
</template>
