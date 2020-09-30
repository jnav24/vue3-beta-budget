<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Select from '@/components/ui-elements/form/Select.vue';
import useTimestamp from '@/hooks/useTimestamp';
import { useTypesStore } from '@/store';

export default defineComponent({
	components: {
		Button,
		Form,
		Select,
	},
	setup() {
		const { getAllMonths } = useTimestamp();
		const typesStore = useTypesStore();
		const form = {
			end_month: {
				rules: [],
				value: '12',
			},
			start_month: {
				rules: {},
				value: '01',
			},
			type: {
				rules: ['required'],
				value: '',
			},
			year: {
				rules: ['required'],
				value: '',
			},
		};
		const isFormValid = ref(false);
		const types: any[] = typesStore.bills;
		const years: any[] = [{ value: '2020', label: '2020' }];

		return {
			form,
			isFormValid,
			months: getAllMonths('abbr'),
			types,
			years,
		};
	},
});
</script>

<template>
	<Form v-model:valid="isFormValid">
		<div class="grid grid-cols-4 gap-8 mb-4">
			<div>
				<Select
					:rules="form.type.rules"
					:items="types"
					item-value="slug"
					item-label="name"
					label="Expense Type"
					v-model:value="form.type.value"
				/>
			</div>

			<div>
				<Select
					:rules="form.year.rules"
					:items="years"
					label="Year"
					v-model:value="form.year.value"
				/>
			</div>

			<div>
				<Select
					:rules="form.start_month.rules"
					:items="months"
					label="Start Month"
					v-model:value="form.start_month.value"
				/>
			</div>

			<div>
				<Select
					:rules="form.end_month.rules"
					:items="months"
					label="End Month"
					v-model:value="form.end_month.value"
				/>
			</div>
		</div>

		<div class="grid grid-cols-4 gap-8">
			<div>
				<Select
					:rules="form.type.rules"
					:items="types"
					item-value="slug"
					item-label="name"
					label="Expense Type"
					v-model:value="form.type.value"
				/>
			</div>

			<div>
				<Select
					:rules="form.year.rules"
					:items="years"
					label="Year"
					v-model:value="form.year.value"
				/>
			</div>

			<div>
				<Select
					:rules="form.start_month.rules"
					:items="months"
					label="Start Month"
					v-model:value="form.start_month.value"
				/>
			</div>
		</div>

		<hr class="my-8" />

		<div class="flex flew-row justify-center items-center mt-6">
			<Button color="secondary" :is-disabled="!isFormValid">
				Search
			</Button>
			<Button>Reset</Button>
		</div>
	</Form>
</template>
