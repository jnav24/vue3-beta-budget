<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		label: {
			required: true,
			type: String,
		},
		type: {
			default: 'text',
			type: String,
		},
	},
});
</script>

<template>
	<div class="mb-4">
		<label for="" class="text-sm text-gray-600">{{ label }}</label>
		<input
			class="w-full p-2 mt-2 border border-gray-300 rounded focus:border-primary outline-none"
			:type="type"
		/>
	</div>
</template>
