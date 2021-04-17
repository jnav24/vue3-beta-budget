<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';

export default defineComponent({
	components: {
		Card,
	},
	props: {
		description: {
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
	<section
		class="flex flex-row justify-between align-top border-b-2 mb-8 pb-8"
	>
		<div class="w-1/3">
			<h3 class="text-gray-800 font-header text-xl">{{ title }}</h3>
			<p class="text-gray-600 text-sm">{{ description }}</p>
		</div>
		<div class="w-1/2">
			<Card class="shadow-md" style="margin-top: 0">
				<slot></slot>
			</Card>
		</div>
	</section>
</template>
