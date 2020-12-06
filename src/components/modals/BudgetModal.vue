<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import Button from '@/components/ui-elements/form/Button.vue';
import Form from '@/components/ui-elements/form/Form';
import Modal from './Modal.vue';
import Select from '@/components/ui-elements/form/Select.vue';
import { useAggregationStore, useBudgetStore } from '@/store';
import useTimestamp from '@/hooks/useTimestamp';
import useUtils from '@/hooks/useUtils';

export default defineComponent({
	components: {
		Button,
		Form,
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
		const aggregationStore = useAggregationStore();
		const budgetStore = useBudgetStore();
		const { addYear, formatDate, getAllMonths } = useTimestamp();
		const { arrayColumn } = useUtils();

		const form = reactive({
			month: {
				rules: ['required'],
				value: '',
			},
			year: {
				rules: [],
				value: formatDate('yyyy'),
			},
		});

		const recentBudget = computed(
			() => budgetStore.sortedBudgets[form.year.value] ?? []
		);
		const months = ref<any>([]);
		const setClose = ref(false);
		const valid = ref(false);
		const years = computed(() => aggregationStore.allYears);

		watch(recentBudget, recent => {
			const allMonths = getAllMonths('full');
			const monthList = arrayColumn('name', recent as any);

			if (formatDate('MM') === '12') {
				aggregationStore.addEmptyYear(
					formatDate('yyyy', addYear(1).toDateString())
				);
			}

			if (recent && recent.length) {
				months.value = allMonths.filter(
					month => !monthList.includes(month.label)
				);
			} else {
				months.value = [allMonths[0]];
			}

			if (months.value.length) {
				form.month.value = months.value[months.value.length - 1].value;
			} else {
				valid.value = false;
				form.month.value = '';
			}
		});

		const setCloseModal = () => {
			setClose.value = true;
			setTimeout(() => (setClose.value = false), 1000);
		};

		return {
			closeModal: (e: boolean) => emit('update:show', e),
			form,
			setClose,
			setCloseModal,
			months,
			valid,
			years,
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
				Monthly Budget
			</h2>

			<div class="px-4 mb-4 grid grid-cols-2 gap-3">
				<Form v-model:valid="valid">
					<Select
						class="mb-4"
						label="Month"
						:items="months"
						:is-disabled="!months.length"
						:rules="form.month.rules"
						v-model:value="form.month.value"
					/>

					<Select
						label="Year"
						:items="years"
						v-model:value="form.year.value"
					/>
				</Form>
			</div>

			<div
				class="bg-gray-100 rounded-b-lg p-4 flex flex-row items-end justify-end"
			>
				<Button @click="setCloseModal(false)">Cancel</Button>
				<Button color="secondary" :is-disabled="!valid">
					New Budget
				</Button>
			</div>
		</div>
	</Modal>
</template>
