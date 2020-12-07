<script lang="ts">
import { computed, defineComponent, reactive, ref, ComputedRef } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import useTimestamp from '@/hooks/useTimestamp';
import useUtils from '@/hooks/useUtils';
import { useTypesStore, CommonExpenseTypeInterface } from '@/store';

export default defineComponent({
	components: {
		Button,
		Form,
		Input,
		Select,
	},
	setup(props, { emit }) {
		const { camelCase } = useUtils();
		const { getAllMonths } = useTimestamp();
		const typesStore = useTypesStore();

		const form = reactive({
			bill_type: {
				rules: ['required'],
				value: '',
			},
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
				rules: [],
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
			() => !['vehicles'].includes(form.bill_type.value)
		);
		const showTypesSelect = computed(
			() => !['miscellaneous'].includes(form.bill_type.value)
		);
		const billTypes = computed(() => typesStore.bills);
		const vehicles: any[] = [];
		const years: any[] = [{ value: '2020', label: '2020' }];

		const billName = computed(() => {
			const type = billTypes.value.find(
				obj => obj.slug === form.bill_type.value
			);
			return type ? type.name : '';
		});

		const types: ComputedRef<CommonExpenseTypeInterface[]> = computed(
			() => (typesStore as any)[form.bill_type.value] ?? []
		);

		const resetForm = () => {
			form.bill_type.value = '';
			form.year.value = '';
		};

		const runSearch = () => {
			const formValues: Record<string, string> = {};

			for (const key of Object.keys(form)) {
				formValues[camelCase(key)] = (form as any)[key].value;
			}

			emit('run-search', formValues);
		};

		return {
			billTypes,
			form,
			billName,
			isFormValid,
			months: getAllMonths('abbr'),
			resetForm,
			runSearch,
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
		<div class="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-4 px-4 sm:px-0">
			<div>
				<Select
					:rules="form.bill_type.rules"
					:items="billTypes"
					item-value="slug"
					item-label="name"
					label="Expense Type"
					v-model:value="form.bill_type.value"
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

		<div
			v-if="form.bill_type.value.length"
			class="grid grid-cols-1 sm:grid-cols-4 gap-8 px-4 sm:px-0"
		>
			<div v-if="form.bill_type.value === 'vehicles'">
				<Select
					:rules="form.vehicle.rules"
					:items="vehicles"
					label="Vehicle"
					v-model:value="form.vehicle.value"
				/>

				<!-- @todo search by notes? -->
			</div>

			<div v-if="showTypesSelect">
				<Select
					:rules="form.type.rules"
					:items="types"
					:label="`${billName} Type`"
					item-value="slug"
					item-label="name"
					v-model:value="form.type.value"
				/>
			</div>

			<div v-if="showNameInput">
				<Input
					label="Search by keywords"
					:value="form.keywords.value"
				/>
			</div>
		</div>

		<hr class="my-8" />

		<div
			class="flex flex-col sm:flex-row justify-center items-center mt-6 px-4 sm:px-0"
		>
			<Button class="w-full sm:w-auto" @click="resetForm()">Reset</Button>
			<Button
				class="w-full sm:w-auto mb-2 sm:mb-0"
				color="secondary"
				:is-disabled="!isFormValid"
				@click="runSearch()"
			>
				Search
			</Button>
		</div>
	</Form>
</template>
