<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		linkTo: {
			required: true,
		},
		linkType: {
			default: 'default',
			type: String,
		},
	},
});
</script>

<template>
	<router-link
		:to="linkTo"
		:class="{
			'mr-6 text-gray-600 hover:text-primary active:text-primary flex flex-row items-center transition ease-out duration-300 py-4':
				linkType === 'default',
			'text-white hover:bg-white hover:bg-opacity-25 flex flex-row items-center p-2 rounded transition ease-out-in duration-300 mb-1':
				linkType === 'inverted',
		}"
		:active-class="
			linkType === 'default'
				? `text-primary`
				: `text-white bg-dark-primary hover:bg-dark-primary hover:bg-opacity-100`
		"
		exact
	>
		<slot></slot>
	</router-link>
</template>
