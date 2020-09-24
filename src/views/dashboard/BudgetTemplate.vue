<script lang="ts">
    import { defineComponent } from 'vue';
    import BudgetTemplateTable from '@/components/tables/BudgetTemplateTable.vue';
    import { useTemplateStore } from '@/store/template';

    export default defineComponent({
        components: {
            BudgetTemplateTable,
        },
        setup() {
            const templateStore = useTemplateStore();
            return { expenses: templateStore.expenses };
        },
    });
</script>

<template>
	<div class="container mx-auto">
		<BudgetTemplateTable
			v-for="(item, key) in expenses"
			:key="key"
			:category="key"
			:data="item"
		/>
	</div>
</template>
