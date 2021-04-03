<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import CardFooter from '@/components/ui-elements/card/CardFooter.vue';
import { Form } from '@/components/ui-elements';
import Input from '@/components/ui-elements/form/Input.vue';
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';

export default defineComponent({
	components: {
		Button,
		CardFooter,
		Form,
		Input,
		SettingsLayout,
	},
	setup() {
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
		const valid = ref(false);

		const handleSave = () => {
			// ...
		};

		return { form, handleSave, valid };
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
				class="flex flex-row justify-end align-center"
				style="padding-right: 0;"
			>
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
