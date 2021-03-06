<script lang="ts">
import { defineComponent, inject, onBeforeMount, reactive, ref } from 'vue';
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
			ExpenseFormContext,
			{} as ExpenseFormContextType
		);
		const form = reactive({
			amount: {
				rules: ['required', 'float:2'],
				value: '',
			},
			name: {
				rules: ['required'],
				value: '',
			},
			type: {
				rules: ['required', 'gt:0'],
				value: 0,
			},
		});
		const valid = ref(false);

		onBeforeMount(() => {
			if (Object.keys(ExpenseContext.data).length) {
				form.amount.value = ExpenseContext.data.amount;
				form.name.value = ExpenseContext.data.name;
				form.type.value = ExpenseContext.getTypeId();
			}
		});

		const closeModal = (submit: boolean) => {
			let data: Record<string, string> = {};

			if (submit && ExpenseContext) {
				data = ExpenseContext.extractFormValues(form);
			}

			ExpenseContext?.closeModal(data);
		};

		return { closeModal, form, types: ExpenseContext.typeList, valid };
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
			</div>
		</div>

		<div
			class="flex flex-row justify-end items-center mt-8 bg-gray-100 pr-2 py-2 rounded-b-lg"
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
