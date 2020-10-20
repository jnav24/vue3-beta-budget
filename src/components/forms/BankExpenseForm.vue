<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import { BudgetExpense } from '@/store/budget';

export default defineComponent({
	components: {
		Button,
		Form,
		Input,
		Select,
	},
	props: {
		data: {
			default: () => ({}),
			type: Object as () => BudgetExpense,
		},
	},
	setup(props) {
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
			if (Object.keys(props.data).length) {
				form.amount.value = props.data.amount;
				form.name.value = props.data.name;
			}
		});

		return { form, valid };
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
			<Button>Cancel</Button>
			<Button color="secondary">Submit</Button>
		</div>
	</Form>
</template>
