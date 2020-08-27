<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
	<div class="min-h-screen flex flex-col justify-center items-center">
		<div
			class="absolute top-0 left-0 w-full h-full bg-primary bg-opacity-75 z-20"
		></div>
		<div class="bg-image"></div>

		<div
			class="relative z-30 w-1/4 mt-6 px-6 py-4 bg-white rounded-lg shadow-md overflow-hidden text-left"
		>
			<router-view />
		</div>
	</div>
</template>

<style scoped>
.bg-image {
	background: url('./../../assets/onboard_bg_1-1.jpg') no-repeat center center
		fixed;
	background-size: cover;
	@apply absolute left-0 top-0 w-full h-full z-10;
}
</style>
