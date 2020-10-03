<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

enum ColorEnum {
	'default',
	'primary',
	'secondary',
}

export default defineComponent({
	props: {
		color: {
			default: 'default',
			type: String,
		},
		isDisabled: {
			default: false,
			type: Boolean,
		},
	},
	setup(props) {
		const buttonColor = ref('default');

		onMounted(() => {
			if (Object.values(ColorEnum).includes(props.color)) {
				buttonColor.value = props.color;
			}
		});

		return { buttonColor };
	},
});
</script>

<template>
	<button
		@click="$emit('on-click')"
		class="focus:outline-none focus:shadow-outline transition duration-150 py-3 px-6 rounded-md text-sm mr-2"
		:class="{
			'bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-gray-400 border':
				buttonColor === 'default' && !isDisabled,
			'bg-primary hover:bg-opacity-85 active:bg-dark-primary text-white':
				buttonColor === 'primary' && !isDisabled,
			'bg-secondary hover:bg-opacity-85 active:bg-dark-secondary text-gray-700':
				buttonColor === 'secondary' && !isDisabled,
			'bg-gray-400 text-gray-700 cursor-text': isDisabled,
		}"
		:disabled="isDisabled"
		type="button"
	>
		<span class="flex flex-row items-center justify-center">
			<slot></slot>
		</span>
	</button>
</template>
