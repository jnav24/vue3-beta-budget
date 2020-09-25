<script lang="ts">
import { defineComponent, ref } from 'vue';
import Form from '@/components/ui-elements/form/Form';
import Label from '@/components/ui-elements/form/Label.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import { useTypesStore } from '@/store/types';

export default defineComponent({
	components: {
		Form,
		Label,
		Select,
	},
	setup() {
		const typesStore = useTypesStore();
		const form = {
			end_month: {
				rules: [],
				value: '',
			},
			start_month: {
				rules: [],
				value: '',
			},
			type: {
				rules: [],
				value: '',
			},
			year: {
				rules: [],
				value: '',
			},
		};
		const isFormValid = ref(false);
		const types: any[] = typesStore.bills;
		const years: any[] = [];
		return { form, isFormValid, types, years };
	},
});
</script>

<template>
	<main class="container mx-auto py-6">
		<p>Report Type Year Start/end months</p>
		<div class="grid grid-cols-6 gap-2">
			<aside class="col-span-1">
				<Form v-model:valid="isFormValid">
					<div class="mb-4">
						<Label label="Expense Type" />
						<Select
							class="z-40"
							:rules="form.type.rules"
							:items="types"
							item-value="slug"
							item-label="name"
							label="Expense Type"
							:value="form.type.value"
						/>
					</div>

					<div class="mb-4">
						<Label label="Year" />
						<Select
							class="z-30"
							:rules="form.year.rules"
							:items="types"
							label="Expense Type"
							:value="form.year.value"
						/>
					</div>

					<div class="mb-4">
						<Label label="Start Month" />
						<Select
							class="z-20"
							:rules="form.year.rules"
							:items="types"
							label="Expense Type"
							:value="form.year.value"
						/>
					</div>

					<div class="mb-4">
						<Label label="End Month" />
						<Select
							class="z-10"
							:rules="form.year.rules"
							:items="types"
							label="Expense Type"
							:value="form.year.value"
						/>
					</div>
				</Form>
			</aside>
		</div>
	</main>
</template>
