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
			type: Boolean,
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

		const updateValue = () => {
			if (FormContext) {
				FormContext.validateField(labelId.value, !props.value);
			}
			emit('update:value', !props.value);
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
		<Button
			checkbox
			@on-click="updateValue()"
			v-if="!value"
		>
			<CheckIcon class="w-4 h-4 text-white" />
		</Button>
		<Button
			checkbox
			@on-click="updateValue()"
			color="primary"
			v-if="value"
		>
			<CheckIcon class="w-4 h-4" />
		</Button>
		<Label class="ml-2" :error="error" :labelId="labelId" :label="label" />
	</div>
</template>
