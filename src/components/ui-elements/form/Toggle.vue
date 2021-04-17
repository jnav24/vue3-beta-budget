<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		value: {
			required: true,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const handleClick = () => {
			emit('update:value', !props.value);
			emit('handle-click', !props.value);
		};

		return {
			handleClick,
		};
	},
});
</script>

<template>
	<button
		@click="handleClick()"
		class="rounded-full w-16 shadow-inner focus:outline-none text-left border transition-all duration-100 ease-in-out"
		:class="{
			'border-primary bg-primary bg-opacity-50 border-opacity-50': value,
			'border-gray-200 bg-gray-200': !value,
		}"
		style="height: 2.15rem;"
		type="button"
	>
		<span
			class="inline-block rounded-full bg-white w-8 h-8 transition duration-100 ease-in-out transform"
			:class="{
				'translate-x-9/10': value,
				'translate-x-0': !value,
			}"
		/>
	</button>
</template>
