<script lang="ts">
import { defineComponent } from 'vue';
import Nav from '@/components/Nav.vue';

export default defineComponent({
	components: {
		Nav,
	},
});
</script>

<template>
	<Nav />

	<div class="bg-gray-200 h-screen">
		<router-view/>
	</div>
</template>
