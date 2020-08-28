<script lang="ts">
import { defineComponent, computed, ref, inject } from 'vue';
import { FormProvider } from '@/components/ui-elements/form/Form';

export default defineComponent({
	props: {
		label: {
			required: true,
			type: String,
		},
		rules: {
			default: () => [],
			type: Array,
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

		const updateForm = inject<(val: boolean) => void>(
			FormProvider,
			() => false
		);
		const labelId = computed(() =>
			props.label.toLowerCase().replace(/\s+/, '-')
		);

		const updateValue = (e: string) => {
			let tempValid = true;

			props.rules.forEach((func: any) => {
				const result = func(props.value);
				if (!tempValid) {
					return;
				}

				if ((!result || typeof result !== 'boolean') && tempValid) {
					error.value = result;
					tempValid = false;
					return;
				}

				error.value = null;
				tempValid = true;
			});

			updateForm(tempValid);
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
		<label :for="labelId" class="text-sm text-gray-600">{{ label }}</label>
		<input
			:id="labelId"
			class="w-full p-2 mt-2 border rounded outline-none"
			:class="{
				'border-gray-300 focus:border-primary': !error,
				'border-red-600': error,
			}"
			:type="type"
			:value="value"
			@input="updateValue($event.target.value)"
		/>
		<span v-if="error" class="text-sm text-red-600">{{ error }}</span>
	</div>
</template>
