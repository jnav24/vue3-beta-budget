<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		color: {
			default: 'white',
		},
	},
});
</script>

<template>
	<div
		class="p-4 rounded-md shadow-sm hover:shadow-lg transition duration-150 my-4"
		:class="`bg-${color}`"
	>
		<!-- transform hover:scale-105 hover:text-white -->
		<slot></slot>
	</div>
</template>
