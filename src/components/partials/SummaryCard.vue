<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import Card from '@/components/ui-elements/card/Card.vue';

export default defineComponent({
	components: {
		Card,
	},
	props: {
		amount: { required: true, type: String },
		average: { required: true, type: String },
		color: { required: true, type: String },
		icon: { required: true, type: String },
		title: { required: true, type: String },
	},
	setup(props) {
		const getIcon = () => {
			return defineAsyncComponent({
				loader: () =>
					import(`@/components/ui-elements/icons/${props.icon}.vue`),
			});
		};

		return { getIcon };
	},
});
</script>

<template>
	<Card>
		<div
			class="flex flex-row justify-evenly sm:justify-between items-center sm:flex-col lg:flex-row"
		>
			<component
				:is="getIcon()"
				class="w-20 sm:w-24 h-20 sm:h-24 mb-0 sm:mb-2 lg:mb-0"
				:class="color"
			/>
			<div class="text-right sm:text-center leading-tight">
				<p class="text-lg sm:text-base lg:text-lg text-gray-700">
					{{ title }}
				</p>
				<p
					class="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-header tracking-tight my-0 sm:mt-1 lg:my-0"
					:class="color"
				>
					{{ amount }}
				</p>
				<p class="text-gray-600 text-xs sm:text-sm">
					Monthly average {{ average }}
				</p>
			</div>
		</div>
	</Card>
</template>
