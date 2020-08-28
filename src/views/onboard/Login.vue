<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import Input from '@/components/ui-elements/form/Input.vue';
import Form from '@/components/ui-elements/form/Form';

export default defineComponent({
	components: {
		Form,
		Input,
	},
	setup() {
		const test = {
			required: 'Email is required',
			email: 'Must be a valid email',
		};
		console.log(test);
		const form = reactive({
			email: {
				rules: [
					(v: any) => !!v || 'Email is required',
					(v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
				],
				value: '',
			},
			password: {
				value: '',
			},
		});
		const valid = ref(false);

		return { form, valid };
	},
});
</script>

<template>
	<pre>{{ valid }}</pre>
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
		/>
		<button
			type="button"
			:disabled="!valid"
			:class="{ 'bg-primary': valid, 'bg-gray-300': !valid }"
		>
			Click Me
		</button>
	</Form>
</template>
