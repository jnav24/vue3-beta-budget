<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import { useTypesStore } from '@/store';
import useUtils from '@/hooks/useUtils';
import BankExpenseForm from '@/components/forms/BankExpenseForm.vue';
import SideBar from '@/components/partials/SideBar.vue';

export default defineComponent({
	components: {
		BankExpenseForm,
		SideBar,
	},
	props: {
		editMode: {
			required: true,
			type: Boolean,
		},
	},
	setup() {
		const typeStore = useTypesStore();
		const { toTitleCase } = useUtils();

		const categories = computed(() => typeStore.bills);
		const formContent = ref(null);
		const formHeight = ref(0);
		const selectedCategory = ref('');
		const selectedTitle = computed(() =>
			toTitleCase(selectedCategory.value)
		);

		nextTick(() => (selectedCategory.value = 'banks'));

		watch(selectedCategory, () => {
			formHeight.value = (formContent.value as any)?.offsetHeight;
		});

		return {
			categories,
			formContent,
			formHeight,
			selectedCategory,
			selectedTitle,
		};
	},
});
</script>

<template>
	<div class="flex flex-row">
		<aside
			class="w-1/4 px-2 bg-gray-100 overflow-auto"
			v-if="!editMode"
			:style="`height: ${formHeight}px`"
		>
			<SideBar
				title="Categories"
				:items="categories"
				item-value="slug"
				item-label="name"
				v-model:selected-item="selectedCategory"
			/>
		</aside>

		<article class="flex-1 bg-white">
			<div ref="formContent">
				<h2 class="text-2xl text-gray-700 font-body mb-4 px-4 pt-2">
					<template v-if="editMode">Edit</template>
					<template v-if="!editMode">
						Add {{ selectedTitle }}
					</template>
					Expense
				</h2>

				<BankExpenseForm />
			</div>
		</article>
	</div>
</template>
