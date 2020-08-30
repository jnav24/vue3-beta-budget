<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		linkTo: {
			required: true,
		},
	},
});
</script>

<template>
	<router-link
		:to="linkTo"
		class="mr-6 text-gray-600 hover:text-primary active:text-primary flex flex-row items-center transition ease-out duration-300 py-4"
		active-class="text-primary"
		exact
	>
		<slot></slot>
	</router-link>
</template>
