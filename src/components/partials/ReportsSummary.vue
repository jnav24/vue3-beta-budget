<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';

export default defineComponent({
	components: {
		Card,
	},
	props: {
		amount: {
			required: true,
			type: String,
		},
		title: {
			required: true,
			type: String,
		},
	},
});
</script>

<template>
	<Card>
		<p class="text-gray-500 text-sm">{{ title }}</p>
		<div class="flex flex-row items-baseline">
			<p class="text-xl text-gray-700">${{ amount }}</p>
			<p
				class="text-sm text-gray-500 flex flex-row items-baseline ml-2 space-x-1"
			>
				<slot></slot>
			</p>
		</div>
	</Card>
</template>
