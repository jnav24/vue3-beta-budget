<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		title: {
			type: String,
			required: true,
		},
	},
});
</script>

<template>
	<button
		@click="$emit('on-click')"
		class="bg-blue hover:bg-dark-blue active:bg-blue focus:outline-none focus:shadow-outline transition duration-150 py-2 px-4 text-white rounded-md"
		type="button"
	>
		{{ title }}
	</button>
</template>
