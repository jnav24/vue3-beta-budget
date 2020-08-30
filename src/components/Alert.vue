<script lang="ts">
import { defineComponent } from 'vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';

export default defineComponent({
	props: {
		message: {
			required: true,
		},
		type: {
			default: 'none',
			required: true,
		},
	},
	components: {
		WarningIcon,
	},
	setup() {
		const allowedTypes = ['error', 'info', 'warn'];

		return {
			allowedTypes,
		};
	},
});
</script>

<template>
	<div
		:class="{
			'bg-red-200 border-red-600 text-red-700': type === 'error',
			'bg-blue-200 border-blue-600': type === 'info',
			'bg-yellow-200 border-yellow-500': type === 'warn',
			'bg-gray-100 border-gray-400': allowedTypes.indexOf(type) < 0,
		}"
		class="rounded px-4 py-3 border mb-4 flex flex-row justify-center items-center"
		role="alert"
	>
		<WarningIcon
			v-if="type === 'warn'"
			styles="w-6 h-6 text-yellow-900 mr-4"
		/>
		<span>{{ message }}</span>
	</div>
</template>
