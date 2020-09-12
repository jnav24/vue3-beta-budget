<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {},
});
</script>

<template>
	<button
		@click="$emit('on-click')"
		class="bg-primary hover:bg-opacity-85 active:bg-dark-primary focus:outline-none focus:shadow-outline transition duration-150 py-3 px-6 text-white rounded-md text-sm mr-2"
		type="button"
	>
		<span class="flex flex-row items-center justify-center">
			<slot></slot>
		</span>
	</button>
</template>
