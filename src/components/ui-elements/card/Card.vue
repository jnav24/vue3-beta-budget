<script lang="ts">
import { defineComponent, provide, reactive } from 'vue';
import { CardProvider } from '@/components/ui-elements';

export default defineComponent({
	props: {
		color: {
			default: 'white',
		},
	},
	setup() {
		const cardContents: Record<string, boolean> = reactive({
			content: false,
			footer: false,
			header: false,
		});

		const setCardContent = (type: string) => {
			if ({}.propertyIsEnumerable.call(cardContents, type)) {
				cardContents[type] = true;
			}
		};

		provide(CardProvider, { setCardContent });

		return { cardContents };
	},
});
</script>

<template>
	<div
		class="rounded-md shadow-sm transition duration-150 my-2 sm:my-4"
		:class="{
			[`bg-${color}`]: true,
			'px-4': !cardContents.content,
			'pb-4': !cardContents.footer,
			'pt-4': !cardContents.header,
		}"
	>
		<!-- transform hover:scale-105 hover:text-white -->
		<slot></slot>
	</div>
</template>
