<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { FormProvider } from '@/components/ui-elements/form/Form';
import Label from '@/components/ui-elements/form/Label.vue';
import CalendarIcon from '@/components/ui-elements/icons/CalendarIcon.vue';

export default defineComponent({
	components: {
		CalendarIcon,
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
		<div class="relative mt-2">
			<div
				class="absolute left-0 top-0 flex flex-col items-center justify-center h-full w-10 bg-gray-600 rounded-l-md"
			>
				<CalendarIcon class="w-5 h-5 text-white" />
			</div>
			<input
				:id="labelId"
				class="w-full p-2 border rounded outline-none"
				:class="{
					'border-gray-300 focus:border-primary': !error,
					'border-red-600': error,
				}"
				type="text"
				:value="value"
				:autocomplete="type !== 'password' ? 'on' : 'off'"
				@blur="updateValue($event.target.value)"
				@input="updateValue($event.target.value)"
				:aria-labelledby="labelId"
				readonly
			/>
		</div>
		<span v-if="error" class="text-sm text-red-600">{{ error }}</span>
	</div>
</template>
