<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
	props: {
		icon: {
			required: true,
			type: String,
		},
		text: {
			required: true,
			type: String,
		},
		title: {
			required: true,
			type: String,
		},
	},
	setup(props) {
		const getComponent = () => {
			return defineAsyncComponent({
				loader: () =>
					import(`@/components/ui-elements/icons/${props.icon}.vue`),
			});
		};

		return { getComponent };
	},
});
</script>

<template>
	<main
		class="container mx-auto px-4 sm:px-0 py-16  w-full rounded items-center text-gray-500 flex-col flex mt-12 space-y-2"
	>
		<component :is="getComponent()" class="w-32 h-32" />
		<p class="text-2xl text-gray-600">{{ title }}</p>
		<p class="text-base">{{ text }}</p>
	</main>
</template>
