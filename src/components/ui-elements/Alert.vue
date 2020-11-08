<script lang="ts">
import { defineComponent } from 'vue';
import CheckIcon from '@/components/ui-elements/icons/CheckIcon.vue';
import WarningIcon from '@/components/ui-elements/icons/WarningIcon.vue';

export default defineComponent({
	components: {
		CheckIcon,
		WarningIcon,
	},
	props: {
		message: {
			required: true,
		},
		type: {
			default: 'none',
			required: true,
		},
	},
	setup() {
		const getTypeStyles = (type: string): string => {
			const mapTypes: Record<string, string> = {
				error: 'bg-red-200 border-red-600 text-red-700',
				info: 'bg-blue-200 border-blue-600',
				success: 'bg-green-200 border-green-600 text-green-800',
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
		<div class="rounded-full bg-green-700 p-2 w-8 mr-2">
			<CheckIcon
				v-if="type === 'success'"
				class="w-4 h-4 text-white mr-4"
			/>
		</div>
		<span>{{ message }}</span>
	</div>
</template>
