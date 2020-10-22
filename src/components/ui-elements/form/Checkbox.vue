<script lang="ts">
import { defineComponent, ref, inject, computed, onMounted } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import CheckIcon from '@/components/ui-elements/icons/CheckIcon.vue';
import { FormProvider } from '@/components/ui-elements/form/Form';
import Label from '@/components/ui-elements/form/Label.vue';

export default defineComponent({
	components: {
		Button,
		CheckIcon,
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
	<div class="flex flex-row items-center">
		<Button class="w-4 h-4" @on-click="updateValue()">
			<CheckIcon class="w-4 h-4" />
		</Button>
		<Label :error="error" :labelId="labelId" :label="label" />
	</div>
</template>
