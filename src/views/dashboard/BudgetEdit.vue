<script lang="ts">
import { defineComponent, ref } from 'vue';
import SideBar from '@/components/partials/SideBar.vue';

export default defineComponent({
	components: {
		SideBar,
	},
	setup() {
		const selectedCategory = ref('banks');
		const categories = [
			{ label: 'Banks', value: 'banks' },
			{ label: 'Credit Cards', value: 'credit-cards' },
			{ label: 'Investments', value: 'investments' },
		];

		return { categories, selectedCategory };
	},
});
</script>

<template>
	<div class="bg-dark-primary w-full">
		<div class="container mx-auto py-8">
			<p>Hello</p>
		</div>
	</div>

	<div class="container mx-auto py-6">
		<div class="grid grid-cols-4 gap-3">
			<SideBar
				title="Categories"
				:items="categories"
				v-model:selected-item="selectedCategory"
			/>
		</div>
	</div>
</template>
