<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import {
	ExpenseFormContext,
	ExpenseFormContextType,
} from '@/components/modals/ExpenseFormProvider';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import Select from '@/components/ui-elements/form/Select.vue';

export default defineComponent({
	components: {
		Button,
		Form,
		Input,
		Select,
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
			name: {
				rules: ['required'],
				value: '',
			},
			type: {
				rules: ['required'],
				value: '',
			},
		});
		const valid = ref(false);

		onMounted(() => {
			if (ExpenseContext && Object.keys(ExpenseContext.data).length) {
				form.amount.value = ExpenseContext.data.amount;
				form.name.value = ExpenseContext.data.name;
			}
		});

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
		</div>

		<div
			class="flex flex-row justify-end items-center mt-8 bg-gray-100 pr-2 py-2"
		>
			<Button @on-click="closeModal(false)">Cancel</Button>
			<Button color="secondary" @on-click="closeModal(true)" :is-disabled="!valid">
				Submit
			</Button>
		</div>
	</Form>
</template>
