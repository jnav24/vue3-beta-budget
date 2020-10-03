<script lang="ts">
import { defineComponent } from 'vue';
import ArrowDownIcon from '@/components/ui-elements/icons/ArrowDownIcon.vue';
import ArrowUpIcon from '@/components/ui-elements/icons/ArrowUpIcon.vue';
import Card from '@/components/ui-elements/card/Card.vue';

export default defineComponent({
	components: {
		ArrowDownIcon,
		ArrowUpIcon,
		Card,
	},
	props: {
		amount: {
			required: true,
			type: String,
		},
		percentage: {
			default: null,
			type: String,
		},
		text: {
			default: null,
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
				<template v-if="percentage">
					<ArrowDownIcon
						class="w-4 h-4 text-danger"
						v-if="percentage < 0"
					/>
					<ArrowUpIcon
						class="w-4 h-4 text-primary"
						v-if="percentage >= 0"
					/>
					<span
						:class="{
							'text-primary': percentage >= 0,
							'text-danger': percentage < 0,
						}"
					>
						{{ percentage.replace('-', '') }}%
					</span>
				</template>

				<template v-if="text">{{ text }}</template>
			</p>
		</div>
	</Card>
</template>
