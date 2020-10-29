<script lang="ts">
import { defineComponent, inject, onBeforeMount, reactive, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Checkbox from '@/components/ui-elements/form/Checkbox.vue';
import {
	ExpenseFormContext,
	ExpenseFormContextType,
} from '@/components/modals/ExpenseFormProvider';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import Textarea from '@/components/ui-elements/form/Textarea.vue';

export default defineComponent({
	components: {
		Button,
		Checkbox,
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
				rules: ['required'],
				value: '',
			},
			apr: {
				rules: [],
				value: '',
			},
			balance: {
				rules: [],
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
			exp_month: {
				rules: [],
				value: '',
			},
			exp_year: {
				rules: [],
				value: '',
			},
			last_4: {
				rules: [],
				value: '',
			},
			limit: {
				rules: [],
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
				rules: ['required'],
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
			if (Object.keys(ExpenseContext.data).length) {
				form.amount.value = ExpenseContext.data.amount;
				form.apr.value = ExpenseContext.data.apr || '';
				form.balance.value = ExpenseContext.data.balance || '';
				form.confirmation.value =
					ExpenseContext.data.confirmation || '';
				form.do_not_track.value =
					!!ExpenseContext.data.do_not_track || false;
				form.due_date.value = ExpenseContext.data.due_date || '';
				form.exp_month.value = ExpenseContext.data.exp_month || '';
				form.exp_year.value = ExpenseContext.data.exp_year || '';
				form.last_4.value = ExpenseContext.data.last_4 || '';
				form.limit.value = ExpenseContext.data.limit || '';
				form.name.value = ExpenseContext.data.name;
				form.notes.value = ExpenseContext.data.notes || '';
				form.paid_date.value = ExpenseContext.data.paid_date || '';
				form.type.value = ExpenseContext.getTypeId();
			}
		});

		return {
			closeModal,
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
		<div class="flex-1 overflow-auto pt-16 lg:pt-0 pb-20 lg:pb-0">
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

				<Select label="Due Date" :items="[]" v-if="!editMode" />
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
					:rules="form.do_not_track.rules"
					v-model:value="form.do_not_track.value"
				/>

				<div class="grid grid-cols-2 gap-4 px-4">
					<Input
						label="Confirmation"
						:rules="form.confirmation.rules"
						v-model:value="form.confirmation.value"
					/>

					<Input
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
			class="flex flex-row justify-end items-center mt-8 bg-gray-100 pr-2 py-2 absolute lg:relative bottom-0 left-0 w-full lg:w-auto"
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
