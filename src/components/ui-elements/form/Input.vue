<script lang="ts">
import { defineComponent, computed } from 'vue';

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
		const labelId = computed(() =>
			props.label.toLowerCase().replace(/\s+/, '-')
		);

		const updateValue = (e: string) => {
			emit('update:value', e);
		};

		return {
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
			class="w-full p-2 mt-2 border border-gray-300 rounded focus:border-primary outline-none"
			:type="type"
			:value="value"
			@input="updateValue($event.target.value)"
		/>
	</div>
</template>
