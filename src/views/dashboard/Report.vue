<script lang="ts">
import { defineComponent } from 'vue';
import ReportsForm from '@/components/partials/ReportsForm.vue';

export default defineComponent({
	components: {
		ReportsForm,
	},
	setup() {
		return {};
	},
});
</script>

<template>
	<main class="container mx-auto py-6">
		<div class="grid grid-cols-6 gap-2">
			<aside class="col-span-1">
				<ReportsForm />
			</aside>
		</div>
	</main>
</template>
