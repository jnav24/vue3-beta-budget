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
			email: {
				rules: ['required', 'email'],
				value: '',
			},
			first_name: {
				rules: ['required', 'min:3'],
				value: '',
			},
			last_name: {
				rules: ['required', 'min:3'],
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
	<section class="pt-12">
		<SettingsLayout
			title="Profile Information"
			description="Update your account's profile information and email address."
		>
			<Form v-model:valid="valid">
				<Input
					label="First Name"
					:rules="form.first_name.rules"
					v-model:value="form.first_name.value"
				/>

				<Input
					label="Last Name"
					:rules="form.last_name.rules"
					v-model:value="form.last_name.value"
				/>

				<Input
					label="Email"
					:rules="form.email.rules"
					v-model:value="form.email.value"
				/>

				<CardFooter
					class="flex flex-row justify-end align-center"
					style="padding-right: 0;"
				>
					<Button
						@click="handleSave()"
						color="secondary"
						:is-disabled="!valid"
					>
						Save
					</Button>
				</CardFooter>
			</Form>
		</SettingsLayout>
	</section>
</template>
