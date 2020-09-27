<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Card from '@/components/ui-elements/card/Card.vue';
import Form from '@/components/ui-elements/form/Form';
import Select from '@/components/ui-elements/form/Select.vue';
import useTimestamp from '@/hooks/useTimestamp';
import { useTypesStore } from '@/store';

export default defineComponent({
	components: {
		Button,
		Card,
		Form,
		Select,
	},
	setup() {
		const { getAllMonths } = useTimestamp();
		const typesStore = useTypesStore();
		const form = {
			end_month: {
				rules: [],
				value: '',
			},
			start_month: {
				rules: {},
				value: '',
			},
			type: {
				rules: ['required'],
				value: '',
			},
			year: {
				rules: [],
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
	<Card>
		<Form v-model:valid="isFormValid">
			<div class="mb-6">
				<Select
					class="z-40"
					:rules="form.type.rules"
					:items="types"
					item-value="slug"
					item-label="name"
					label="Expense Type"
					v-model:value="form.type.value"
				/>
			</div>

			<div class="mb-6">
				<Select
					class="z-30"
					:rules="form.year.rules"
					:items="years"
					label="Year"
					v-model:value="form.year.value"
				/>
			</div>

			<div class="mb-6">
				<Select
					class="z-20"
					:rules="form.start_month.rules"
					:items="months"
					label="Start Month"
					v-model:value="form.start_month.value"
				/>
			</div>

			<div class="mb-6">
				<Select
					class="z-10"
					:rules="form.end_month.rules"
					:items="months"
					label="End Month"
					v-model:value="form.end_month.value"
				/>
			</div>

			<Button class="w-full" :is-disabled="!isFormValid">Search</Button>
		</Form>
	</Card>
</template>
