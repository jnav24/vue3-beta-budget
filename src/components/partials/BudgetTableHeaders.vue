<script lang="ts">
import { defineComponent } from 'vue';
import useUtils from '@/hooks/useUtils';

export default defineComponent({
	props: {
		headers: {
			required: true,
			type: Array as () => string[],
		},
	},
	setup() {
		const { toTitleCase } = useUtils();

		return { toTitleCase };
	},
});
</script>

<template>
	<div :class="`grid gap-2 grid-cols-2 sm:grid-cols-${headers.length}`">
		<div
			v-for="(header, index) in headers"
			:key="index"
			:class="{
				'pl-2': index === 0,
				'hidden sm:block': !['name', 'actions'].includes(header),
			}"
		>
			{{ toTitleCase(header, '_') }}
		</div>
	</div>
</template>
