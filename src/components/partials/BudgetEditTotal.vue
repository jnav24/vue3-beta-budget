<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
	props: {
		amount: {
			required: true,
			type: String,
		},
		icon: {
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
	<div class="flex flex-row items-center">
		<div class="bg-primary rounded-full p-2 mr-2">
			<component :is="getComponent()" class="w-6 h-6 text-white" />
		</div>

		<div class="space-y-0">
			<p class="text-gray-500 uppercase text-sm">{{ title }}</p>
			<p class="font-body text-xl text-gray-700">${{ amount }}</p>
		</div>
	</div>
</template>
