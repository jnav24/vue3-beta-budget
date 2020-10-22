<script lang="ts">
import { defineComponent, ref, inject, computed, onMounted } from 'vue';
import { FormProvider } from '@/components/ui-elements/form/Form';
import Label from '@/components/ui-elements/form/Label.vue';

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
		value: {
			required: true,
			type: String,
		},
	},
	setup(props, { emit }) {
		const labelId = ref<string>('');
		const FormContext = inject<any>(FormProvider, undefined);

		onMounted(() => {
			if (props.label && !!FormContext) {
				labelId.value = FormContext.setupForm(props.label, props.rules);
				FormContext.validateField(labelId.value, props.value, true);
			}
		});

		const error = computed(() => {
			if (FormContext && FormContext.formElements[labelId.value]) {
				return FormContext.formElements[labelId.value].error;
			}

			return null;
		});

		const updateValue = (inputValue: string) => {
			if (FormContext) {
				FormContext.validateField(labelId.value, inputValue);
			}
			emit('update:value', inputValue);
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
	<div>
		<Label :error="error" :labelId="labelId" :label="label" />
		<textarea
			:id="labelId"
			class="w-full p-2 mt-2 border rounded outline-none"
			:class="{
				'border-gray-300 focus:border-primary': !error,
				'border-red-600': error,
			}"
			:value="value"
			@blur="updateValue($event.target.value)"
			@input="updateValue($event.target.value)"
			:aria-labelledby="labelId"
		/>
	</div>
</template>
