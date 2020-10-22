<script lang="ts">
import { defineComponent, inject, reactive, ref } from 'vue';
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
	props: {
		editMode: {
			required: true,
			type: Boolean,
		},
	},
	setup() {
		const ExpenseContext = inject<ExpenseFormContextType>(
			ExpenseFormContext
		);
		const form = reactive({
			amount: {
				rules: ['required'],
				value: '',
			},
			confirmation: {
				rules: [],
				value: '',
			},
			do_not_track: {
				rules: [],
				value: '',
			},
			due_date: {
				rules: [],
				value: '1',
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
				value: '',
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

		return { closeModal, form, valid };
	},
});
</script>

<template>
	<Form v-model:valid="valid">
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

			<Select label="Type" :items="[]" />

			<Select label="Due Date" :items="[]" v-if="!editMode" />
		</div>

		<template v-if="editMode">
			<Checkbox
				label="Calculate this purchase in your totals?"
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

				<Textarea
					label="Notes"
					:rules="form.notes.rules"
					v-model:value="form.notes.value"
				/>
			</div>
		</template>

		<div
			class="flex flex-row justify-end items-center mt-8 bg-gray-100 pr-2 py-2"
		>
			<Button @on-click="closeModal(false)">Cancel</Button>
			<Button color="secondary" @on-click="closeModal(true)">
				Submit
			</Button>
		</div>
	</Form>
</template>
