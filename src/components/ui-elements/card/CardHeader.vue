<script lang="ts">
import { defineComponent, inject, onMounted } from 'vue';
import { CardProvider } from '@/components/ui-elements';

export default defineComponent({
	setup() {
		const { setCardContent } = inject<any>(CardProvider);
		onMounted(() => setCardContent('header'));
	},
});
</script>

<template>
	<div class="py-4 px-4">
		<slot></slot>
	</div>
</template>
