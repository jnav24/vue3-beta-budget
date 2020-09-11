<script lang="ts">
import { defineComponent, inject, onMounted } from 'vue';
import { CardProvider } from '@/components/ui-elements';

export default defineComponent({
	setup() {
		const { setCardContent } = inject<any>(CardProvider);
		onMounted(() => setCardContent('content'));
	},
});
</script>

<template>
	<div class="px-4">
		<slot></slot>
	</div>
</template>
