<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import CardFooter from '@/components/ui-elements/card/CardFooter.vue';
import { Form } from '@/components/ui-elements';
import InlineAlert from '@/components/ui-elements/InlineAlert.vue';
import Input from '@/components/ui-elements/form/Input.vue';
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';
import { useUserStore } from '@/store';

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
		const userStore = useUserStore();
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
		const isSuccess = ref(false);
		const showAlert = ref(false);
		const valid = ref(false);

		const handleSave = async () => {
			const { success } = await userStore.updateProfile({
				email: form.email.value,
				first_name: form.first_name.value,
				last_name: form.last_name.value,
			});
			if (success) {
				valid.value = false;
			}
			showAlert.value = true;
		};

		return { form, handleSave, isSuccess, showAlert, valid };
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
					<InlineAlert v-model:show="showAlert" :is-success="isSuccess" />
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
