<script lang="ts">
import {
	computed,
	defineComponent,
	inject,
	onBeforeMount,
	reactive,
	ref,
} from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Checkbox from '@/components/ui-elements/form/Checkbox.vue';
import DatePicker from '@/components/ui-elements/form/DatePicker.vue';
import {
	ExpenseFormContext,
	ExpenseFormContextType,
} from '@/components/modals/ExpenseFormProvider';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import Textarea from '@/components/ui-elements/form/Textarea.vue';
import { useUserStore, useTypesStore } from '@/store';

export default defineComponent({
	components: {
		Button,
		Checkbox,
		DatePicker,
		Form,
		Input,
		Select,
		Textarea,
	},
	setup() {
		const ExpenseContext = inject<ExpenseFormContextType>(
			ExpenseFormContext,
			{} as ExpenseFormContextType
		);
		const userStore = useUserStore();
		const typeStore = useTypesStore();

		const form = reactive({
			amount: {
				rules: ['required', 'float:2'],
				value: '',
			},
			balance: {
				rules: ['float:2'],
				value: '',
			},
			confirmation: {
				rules: [],
				value: '',
			},
			do_not_track: {
				rules: [],
				value: false,
			},
			due_date: {
				rules: [],
				value: '1',
			},
			mileage: {
				rules: [],
				value: '',
			},
			notes: {
				rules: [],
				value: '',
			},
			paid_date: {
				rules: [],
				value: '',
			},
			type: {
				rules: ['required', 'gt:0'],
				value: 0,
			},
			vehicle: {
				rules: ['required', 'gt:0'],
				value: 0,
			},
		});
		const valid = ref(false);
		const vehicles = computed(() =>
			userStore.vehicleList.filter(vehicle => vehicle.active)
		);

		onBeforeMount(() => {
			if (Object.keys(ExpenseContext.data).length) {
				form.amount.value = ExpenseContext.data.amount;
				form.balance.value = ExpenseContext.data.balance || '';
				form.confirmation.value =
					ExpenseContext.data.confirmation || '';
				form.do_not_track.value =
					!!ExpenseContext.data.do_not_track || false;
				form.due_date.value = ExpenseContext.data.due_date || '';
				form.vehicle.value = ExpenseContext.data.user_vehicle_id || 0;
				form.mileage.value = ExpenseContext.data.mileage || '';
				form.notes.value = ExpenseContext.data.notes || '';
				form.paid_date.value = ExpenseContext.data.paid_date || '';
				form.type.value = ExpenseContext.getTypeId();
			}
		});

		const typeName = computed(() =>
			typeStore.getSlugById('vehicles', form.type.value)
		);

		const closeModal = (submit: boolean) => {
			let data: Record<string, string> = {};

			if (submit && ExpenseContext) {
				data = ExpenseContext.extractFormValues(form);
			}

			ExpenseContext?.closeModal(data);
		};

		return {
			closeModal,
			dates: ExpenseContext?.dates ?? [],
			editMode: ExpenseContext.editMode,
			form,
			typeName,
			types: ExpenseContext.typeList,
			valid,
			vehicles,
		};
	},
});
</script>

<template>
	<Form v-model:valid="valid">
		<div class="flex-1 overflow-auto lg:overflow-visible pb-20 lg:pb-0">
			<div class="grid grid-cols-2 gap-4 px-4">
				<Select
					label="Vehicle"
					:items="vehicles"
					:rules="form.vehicle.rules"
					v-model:value="form.vehicle.value"
				/>

				<Input
					label="Amount"
					:rules="form.amount.rules"
					v-model:value="form.amount.value"
				/>

				<Select
					label="Account Type"
					:items="types"
					item-label="name"
					item-value="id"
					:rules="form.type.rules"
					v-model:value="form.type.value"
				/>

				<Input
					label="Account Balance"
					:rules="form.balance.rules"
					v-model:value="form.balance.value"
				/>

				<Input
					v-if="typeName === 'gas'"
					label="Mileage"
					:rules="form.mileage.rules"
					v-model:value="form.mileage.value"
				/>

				<Select
					label="Due Date"
					:items="dates"
					v-if="!editMode"
					:rules="form.due_date.rules"
					v-model:value="form.due_date.value"
				/>
			</div>

			<template v-if="editMode">
				<Checkbox
					class="pl-4 my-6"
					label="Do not track this expense"
					:rules="form.do_not_track.rules"
					v-model:value="form.do_not_track.value"
				/>

				<div class="grid grid-cols-2 gap-4 px-4">
					<Input
						label="Confirmation"
						:rules="form.confirmation.rules"
						v-model:value="form.confirmation.value"
					/>

					<DatePicker
						label="Paid Date"
						:rules="form.paid_date.rules"
						v-model:value="form.paid_date.value"
					/>
				</div>

				<Textarea
					class="px-4"
					label="Notes"
					:rules="form.notes.rules"
					v-model:value="form.notes.value"
				/>
			</template>
		</div>

		<div
			class="flex flex-row justify-end items-center mt-8 bg-gray-100 pr-2 py-2 absolute lg:relative bottom-0 left-0 w-full lg:w-auto rounded-b-lg"
		>
			<Button @on-click="closeModal(false)">Cancel</Button>
			<Button
				color="secondary"
				@on-click="closeModal(true)"
				:is-disabled="!valid"
			>
				Submit
			</Button>
		</div>
	</Form>
</template>
