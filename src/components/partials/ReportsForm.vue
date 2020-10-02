<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import useTimestamp from '@/hooks/useTimestamp';
import { useTypesStore } from '@/store';

export default defineComponent({
	components: {
		Button,
		Form,
		Input,
		Select,
	},
	setup() {
		const { getAllMonths } = useTimestamp();
		const typesStore = useTypesStore();

		const form = reactive({
			end_month: {
				rules: [],
				value: '12',
			},
			keywords: {
				rules: [],
				value: '',
			},
			start_month: {
				rules: {},
				value: '01',
			},
			type: {
				rules: ['required'],
				value: '',
			},
			vehicle: {
				rules: [],
				value: '',
			},
			year: {
				rules: ['required'],
				value: '',
			},
		});
		const isFormValid = ref(false);
		const showNameInput = computed(
			() => !['vehicles'].includes(form.type.value)
		);
		const showTypesSelect = computed(
			() => !['miscellaneous', 'incomes'].includes(form.type.value)
		);
		const types: any[] = typesStore.bills;
		const vehicles: any[] = [];
		const years: any[] = [{ value: '2020', label: '2020' }];

		const billName = computed(() => {
			return types.find(obj => obj.value === form.type.value).value ?? '';
		});

		return {
			form,
			billName,
			isFormValid,
			months: getAllMonths('abbr'),
			showNameInput,
			showTypesSelect,
			types,
			vehicles,
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

		<div v-if="form.type.value.length" class="grid grid-cols-4 gap-8">
			<div v-if="form.type.value === 'vehicles'">
				<Select
					:rules="form.vehicle.rules"
					:items="vehicles"
					label="Vehicle"
					v-model:value="form.vehicle.value"
				/>
			</div>

			<div v-if="showTypesSelect">
				<Select
					:rules="form.year.rules"
					:items="years"
					:label="`${billName} Type`"
					v-model:value="form.year.value"
				/>
			</div>

			<div v-if="showNameInput">
				<Input
					label="Search by keywords"
					:value="form.keywords.value"
				/>
			</div>

			<div v-if="form.type.value === 'vehicles'">
				<!-- @todo search by notes? -->
				<p>Search by notes?</p>
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
