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
		<component :is="getComponent()" />

		<div>
			<p class="text-gray-500 uppercase text-sm">{{ title }}</p>
			<p class="text-xl text-gray-400">${{ amount }}</p>
		</div>
	</div>
</template>
