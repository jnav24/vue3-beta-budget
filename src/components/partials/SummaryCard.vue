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
		<div class="flex flex-row justify-between items-center">
			<component
				:is="getIcon()"
				class="w-20 sm:w-24 h-20 sm:h-24"
				:class="color"
			/>
			<div class="text-right leading-tight">
				<p class="text-lg text-gray-700">
					{{ title }}
				</p>
				<p
					class="text-3xl sm:text-4xl font-header tracking-tight"
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
