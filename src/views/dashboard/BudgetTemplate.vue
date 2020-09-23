<script lang="ts">
import { defineComponent } from 'vue';
import BudgetTemplateTable from '@/components/tables/BudgetTemplateTable.vue';

export default defineComponent({
	components: {
		BudgetTemplateTable,
	},
});
</script>

<template>
	<div class="container mx-auto">
		<BudgetTemplateTable />
	</div>
</template>
