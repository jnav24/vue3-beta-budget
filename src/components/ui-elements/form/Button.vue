<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

enum ColorEnum {
	'default',
	'primary',
	'secondary',
	'danger',
}

export default defineComponent({
	props: {
		color: {
			default: 'default',
			type: String,
		},
		checkbox: {
			default: false,
			type: Boolean,
		},
		fab: {
			default: false,
			type: Boolean,
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
		class="focus:outline-none focus:shadow-outline transition duration-150"
		:class="{
			'bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-gray-400 border':
				buttonColor === 'default' && !isDisabled,
			'bg-primary hover:bg-opacity-85 active:bg-dark-primary text-white':
				buttonColor === 'primary' && !isDisabled,
			'bg-secondary hover:bg-opacity-85 active:bg-dark-secondary text-gray-700':
				buttonColor === 'secondary' && !isDisabled,
			'bg-danger hover:bg-opacity-85 active:bg-dark-danger':
				buttonColor === 'danger' && !isDisabled,
			'rounded-full p-2 mr-2': fab,
			'p-1 rounded-md': checkbox,
			'py-3 px-6 rounded-md text-sm mr-2': !fab && !checkbox,
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
