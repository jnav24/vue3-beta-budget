<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Alert from '@/components/ui-elements/Alert.vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';

export default defineComponent({
	components: {
		Alert,
		Button,
		Form,
		Input,
	},
	setup() {
		const expired = ref(true);
		const form = reactive({
			verify: {
				rules: ['required', 'max:6', 'alpha-numeric'],
				value: '',
			},
		});
		const valid = ref(false);

		return { expired, form, valid };
	},
});
</script>

<template>
	<div class="pb-6 px-0 sm:px-6 sm:shadow-sm">
		<h1
			class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8"
		>
			Verify your device
		</h1>

		<Alert type="error" message="sdfs" v-if="false" />

		<template v-if="!expired">
			<p class="text-sm text-center text-gray-600 mb-8">
				This device isn't recognized. We have sent you an email to your
				email address on file. For your security, enter the your
				verification code, from the email, in order to continue.
			</p>

			<Form v-model:valid="valid">
				<Input
					label="Enter Your Verification Code"
					v-model:value="form.verify.value"
					:rules="form.verify.rules"
				/>
				<Button :is-disabled="!valid" color="secondary">Submit</Button>
			</Form>
		</template>

		<template v-if="expired">
			<p class="text-sm text-center text-gray-600 mb-8">
				It still looks like you need to verify your current device.
				Unfortunately, this page has expired. Click on the button below
				and we will send you a new verification code to the email on
				file.
			</p>
			<Button color="secondary">Resend Email</Button>
		</template>
	</div>
</template>
