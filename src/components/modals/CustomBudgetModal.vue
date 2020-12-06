<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Input from '@/components/ui-elements/form/Input.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import Modal from './Modal.vue';
import { useBudgetStore, useTypesStore } from '@/store';
import useTimestamp from '@/hooks/useTimestamp';
import useUtils from '@/hooks/useUtils';
import { BudgetList } from '@/store/budget';
import { useRouter } from 'vue-router';

export default defineComponent({
	components: {
		Button,
		Form,
		Input,
		Modal,
		Select,
	},
	props: {
		show: {
			required: true,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const budgetStore = useBudgetStore();
		const typesStore = useTypesStore();
		const { getAllMonths, getSetAmountOfYears } = useTimestamp();
		const { arrayColumn } = useUtils();
		const { push } = useRouter();

		const form = reactive({
			name: {
				rules: ['required'],
				value: '',
			},
			month: {
				rules: ['required'],
				value: '',
			},
			year: {
				rules: ['required'],
				value: '',
			},
		});
		const setClose = ref(false);

		const setCloseModal = () => {
			setClose.value = true;
			setTimeout(() => (setClose.value = false), 1000);
		};

		const addNewBudget = async () => {
			const types = arrayColumn('slug', typesStore.bills as any);
			const data: BudgetList = {
				name: form.name.value,
				budget_cycle: `${form.year.value}-${form.month.value}-01 00:00:00`,
				expenses: {},
			};

			types.forEach(type => ((data.expenses as any)[type] = []));
			const response = await budgetStore.saveBudget(data);

			if (response.success) {
				push({
					name: 'budget-edit',
					params: { id: response.data.id },
				});
			}
		};

		return {
			addNewBudget,
			closeModal: (e: boolean) => emit('update:show', e),
			form,
			months: getAllMonths('full'),
			setClose,
			setCloseModal,
			valid: ref(false),
			years: getSetAmountOfYears(10),
		};
	},
});
</script>

<template>
	<Modal :show="show" :set-close="setClose" @close="closeModal($event)">
		<div class="w-100">
			<h2
				class="text-2xl text-gray-700 font-body mb-4 px-4 pt-2 absolute lg:relative top-0 left-0 w-full bg-white lg:bg-opacity-0"
			>
				Custom Budget
			</h2>

			<div class="px-4 mb-4">
				<Form v-model:valid="valid">
					<Input
						label="Name"
						:rules="form.name.rules"
						v-model:value="form.name.value"
					/>

					<div class="grid grid-cols-2 gap-3">
						<Select
							class="mb-4"
							label="Month"
							:items="months"
							:rules="form.month.rules"
							v-model:value="form.month.value"
						/>

						<Select
							class="mb-4"
							label="Year"
							:items="years"
							:rules="form.year.rules"
							v-model:value="form.year.value"
						/>
					</div>
				</Form>
			</div>

			<div
				class="bg-gray-100 rounded-b-lg p-4 flex flex-row items-end justify-end"
			>
				<Button @click="setCloseModal(false)">Cancel</Button>
				<Button
					color="secondary"
					:is-disabled="!valid"
					@click="addNewBudget()"
				>
					Add Budget
				</Button>
			</div>
		</div>
	</Modal>
</template>
