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
		const form = reactive({
			email: {
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
	<pre>{{ form.email }}</pre>
	<Form v-model:valid="valid">
		<Input label="Email" v-model:value="form.email.value" />
		<Input
			label="Password"
			type="password"
			v-model:value="form.password.value"
		/>
	</Form>
</template>
