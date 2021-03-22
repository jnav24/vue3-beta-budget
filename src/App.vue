<template>
	<div id="app">
		<router-view />
	</div>

	<div
		class="grid-cols-4 sm:grid-cols-4 md:grid-cols-4"
		style="visibility: hidden;"
	></div>
	<div
		class="grid-cols-5 sm:grid-cols-5 md:grid-cols-5"
		style="visibility: hidden;"
	></div>
	<div
		class="grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
		style="visibility: hidden;"
	></div>
	<div
		class="grid-cols-7 sm:grid-cols-7 md:grid-cols-7"
		style="visibility: hidden;"
	></div>
	<div
		class="grid-cols-9 sm:grid-cols-9 md:grid-cols-9"
		style="visibility: hidden;"
	></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
