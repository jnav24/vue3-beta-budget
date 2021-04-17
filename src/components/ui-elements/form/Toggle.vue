<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	setup() {
		const toggleState = ref(false);

		const handleClick = () => {
			toggleState.value = !toggleState.value;
		};

		return {
			handleClick,
			toggleState,
		};
	},
});
</script>

<template>
	<button
		@click="handleClick()"
		class="rounded-full w-16 shadow-inner focus:outline-none text-left border transition-all duration-100 ease-in-out"
		:class="{
			'border-primary bg-primary bg-opacity-50 border-opacity-50': toggleState,
			'border-gray-200 bg-gray-200': !toggleState,
		}"
		style="height: 2.15rem;"
		type="button"
	>
		<span
			class="inline-block rounded-full bg-white w-8 h-8 transition duration-100 ease-in-out transform"
			:class="{
				'translate-x-9/10': toggleState,
				'translate-x-0': !toggleState,
			}"
		/>
	</button>
</template>
