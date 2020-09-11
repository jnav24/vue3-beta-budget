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
		const getTypeStyles = (type: string): string => {
			const mapTypes: Record<string, string> = {
				error: 'bg-red-200 border-red-600 text-red-700',
				info: 'bg-blue-200 border-blue-600',
				warn: 'bg-yellow-200 border-yellow-500',
			};

			return mapTypes[type] ?? 'bg-gray-100 border-gray-400';
		};

		return {
			getTypeStyles,
		};
	},
});
</script>

<template>
	<div
		:class="getTypeStyles(type)"
		class="rounded mx-2 sm:mx-auto px-4 py-3 border mb-4 flex flex-row justify-center items-center"
		role="alert"
	>
		<WarningIcon
			v-if="type === 'warn'"
			class="w-6 h-6 text-yellow-900 mr-4"
		/>
		<span>{{ message }}</span>
	</div>
</template>
