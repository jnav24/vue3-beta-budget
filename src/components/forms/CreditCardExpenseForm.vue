<script lang="ts">
import { defineComponent, inject, onBeforeMount, reactive, ref } from 'vue';
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
import { getPaidDate } from '@/utils/expense-form';

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
		const form = reactive({
			amount: {
				rules: ['required', 'float:2'],
				value: '0.00',
			},
			apr: {
				rules: [],
				value: '0',
			},
			balance: {
				rules: [],
				value: '0.00',
			},
			confirmation: {
				rules: [],
				value: '',
			},
			not_track_amount: {
				rules: [],
				value: false,
			},
			due_date: {
				rules: ['required'],
				value: '1',
			},
			exp_month: {
				rules: [],
				value: '0',
			},
			exp_year: {
				rules: [],
				value: '0',
			},
			last_4: {
				rules: [],
				value: '',
			},
			limit: {
				rules: ['required', 'numeric'],
				value: '',
			},
			name: {
				rules: ['required'],
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
		});
		const valid = ref(false);

		const closeModal = (submit: boolean) => {
			let data: Record<string, string> = {};

			if (submit && ExpenseContext) {
				data = ExpenseContext.extractFormValues(form);
			}

			ExpenseContext?.closeModal(data);
		};

		onBeforeMount(() => {
			form.paid_date.value = ExpenseContext.budgetCycle.value;

			if (Object.keys(ExpenseContext.data).length) {
				form.amount.value = ExpenseContext.data.amount;
				form.apr.value = ExpenseContext.data.apr || form.apr.value;
				form.balance.value = ExpenseContext.data.balance || '';
				form.confirmation.value =
					ExpenseContext.data.confirmation || '';
				form.not_track_amount.value =
					!!ExpenseContext.data.not_track_amount || false;
				form.due_date.value = ExpenseContext.data.due_date || '';
				form.exp_month.value =
					ExpenseContext.data.exp_month || form.exp_month.value;
				form.exp_year.value =
					ExpenseContext.data.exp_year || form.exp_year.value;
				form.last_4.value = ExpenseContext.data.last_4 || '';
				form.limit.value = ExpenseContext.data.limit || '';
				form.name.value = ExpenseContext.data.name;
				form.notes.value = ExpenseContext.data.notes || '';
				form.paid_date.value = getPaidDate(ExpenseContext);
				form.type.value = ExpenseContext.getTypeId();
			}
		});

		return {
			closeModal,
			dates: ExpenseContext?.dates ?? [],
			editMode: ExpenseContext.editMode,
			form,
			types: ExpenseContext.typeList,
			valid,
		};
	},
});
</script>

<template>
	<Form v-model:valid="valid">
		<div class="flex-1 overflow-auto lg:overflow-visible pb-20 lg:pb-0">
			<div class="grid grid-cols-2 gap-4 px-4">
				<Input
					label="Name"
					:rules="form.name.rules"
					v-model:value="form.name.value"
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

				<Select
					class="mb-4"
					label="Due Date"
					:items="dates"
					v-if="!editMode"
					:rules="form.due_date.rules"
					v-model:value="form.due_date.value"
				/>
			</div>

			<div class="grid grid-cols-2 gap-4 px-4 mt-2">
				<Input
					label="Credit Limit"
					:rules="form.limit.rules"
					v-model:value="form.limit.value"
				/>

				<Input
					label="APR"
					:rules="form.apr.rules"
					v-model:value="form.apr.value"
				/>
			</div>

			<div class="grid grid-cols-3 gap-4 px-4">
				<Input
					label="Last 4 Digits of Credit Card"
					:rules="form.last_4.rules"
					v-model:value="form.last_4.value"
				/>

				<Input
					label="Expiration Month"
					:rules="form.exp_month.rules"
					v-model:value="form.exp_month.value"
				/>

				<Input
					label="Expiration Year"
					:rules="form.exp_year.rules"
					v-model:value="form.exp_year.value"
				/>
			</div>

			<template v-if="editMode">
				<Checkbox
					class="pl-4 my-6"
					label="Do not track this expense"
					:rules="form.not_track_amount.rules"
					v-model:value="form.not_track_amount.value"
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
