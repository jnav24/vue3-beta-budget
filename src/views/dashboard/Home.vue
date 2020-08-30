<script lang="ts">
import { defineComponent } from 'vue';
import Alert from '@/components/Alert.vue';

export default defineComponent({
	components: {
		Alert,
	},
});
</script>

<template>
	<div class="container mx-auto py-6">
		<Alert type="warn" message="You have 19 unpaid bills"></Alert>
	</div>
</template>
