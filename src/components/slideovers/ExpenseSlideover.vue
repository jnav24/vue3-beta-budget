<script lang="ts">
import { defineComponent } from 'vue';
import Slideover from '@/components/slideovers/Slideover.vue';

export default defineComponent({
	components: {
		Slideover,
	},
});
</script>

<template>
	<Slideover>
		<h1>Hello motto</h1>
	</Slideover>
</template>
