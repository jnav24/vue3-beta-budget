<script lang="ts">
import { defineComponent, ref, inject, onMounted } from 'vue';
import { FormProvider } from '@/components/ui-elements/form/Form';
import useFormValidation from '@/hooks/useFormValidation';
import { Label } from '@/components/ui-elements';

export default defineComponent({
	components: {
		Label,
	},
	props: {
		label: {
			required: true,
			type: String,
		},
		rules: {
			default: () => ({}),
			type: Object,
		},
		type: {
			default: 'text',
			type: String,
		},
		value: {
			required: true,
			type: String,
		},
	},
	setup(props, { emit }) {
		const error = ref(null);
		const labelId = ref(null);
		const { validateInput } = useFormValidation();
		const { isFormValid, setFormElement, setFormId } = inject<any>(
			FormProvider
		);

		onMounted(() => {
			labelId.value = setFormId(props.label);
			setFormElement(labelId.value, !props.rules);
		});

		const updateValue = (e: string) => {
			let tempValid = true;

			// @todo update this
			for (const [type, message] of Object.entries(props.rules)) {
				const isValid = validateInput(type, e);

				if (!tempValid) {
					continue;
				}

				if ((!isValid || typeof isValid !== 'boolean') && tempValid) {
					error.value = message;
					tempValid = false;
					continue;
				}

				error.value = null;
				tempValid = true;
			}

			setFormElement(labelId.value, tempValid);
			isFormValid();
			emit('update:value', e);
		};

		return {
			error,
			labelId,
			updateValue,
		};
	},
});
</script>

<template>
	<div class="mb-4">
		<Label :error="error" :labelId="labelId" :label="label" />
		<input
			:id="labelId"
			class="w-full p-2 mt-2 border rounded outline-none"
			:class="{
				'border-gray-300 focus:border-primary': !error,
				'border-red-600': error,
			}"
			:type="type"
			:value="value"
			:autocomplete="type !== 'password' ? 'on' : 'off'"
			@blur="updateValue($event.target.value)"
			@input="updateValue($event.target.value)"
		/>
		<span v-if="error" class="text-sm text-red-600">{{ error }}</span>
	</div>
</template>
