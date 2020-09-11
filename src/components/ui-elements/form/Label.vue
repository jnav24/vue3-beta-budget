<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		error: {
			default: false,
			type: Boolean,
		},
		label: {
			required: true,
			type: String,
		},
		labelId: {
			required: true,
			type: String,
		},
	},
});
</script>

<template>
	<label
		:for="labelId"
		:class="{ 'text-gray-600': !error, 'text-red-600': error }"
		class="text-sm"
	>
		{{ label }}
	</label>
</template>
