<script lang="ts">
import {
	computed,
	defineComponent,
	inject,
	onMounted,
	ref,
	watchEffect,
} from 'vue';
import { FormProvider } from '@/components/ui-elements/form/Form';
import Button from '@/components/ui-elements/form/Button.vue';
import Label from '@/components/ui-elements/form/Label.vue';
import CalendarIcon from '@/components/ui-elements/icons/CalendarIcon.vue';
import ChevronLeftIcon from '@/components/ui-elements/icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@/components/ui-elements/icons/ChevronRightIcon.vue';
import useTimestamp from '@/hooks/useTimestamp';

export default defineComponent({
	components: {
		Button,
		CalendarIcon,
		ChevronLeftIcon,
		ChevronRightIcon,
		Label,
	},
	props: {
		label: {
			required: true,
			type: String,
		},
		rules: {
			default: () => ({}),
			type: Object,
		},
		value: {
			required: true,
			type: String,
		},
	},
	setup(props, { emit }) {
		const {
			addMonth,
			formatDate,
			formatTimeZone,
			getEndDayOfMonth,
			getStartDayOfMonth,
		} = useTimestamp();
		const dateCounter = ref(0);
		const dateHeader = computed(() =>
			formatDate('yyyy-MM-dd', addMonth(dateCounter.value).toISOString())
		);
		const datePicker = ref(null);
		const dateTemplate = computed(() =>
			formatDate('yyyy-MM', dateHeader.value)
		);
		const dayBegins = computed(() =>
			formatDate(
				'EEEEEE',
				getStartDayOfMonth(
					addMonth(dateCounter.value).toISOString()
				).toISOString()
			)
		);
		const dayEnds = computed(() =>
			formatDate(
				'EEEEEE',
				getEndDayOfMonth(
					addMonth(dateCounter.value).toISOString()
				).toISOString()
			)
		);
		const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
		const daysList = computed(() => {
			const buffer = Array.from(
				Array(days.indexOf(dayBegins.value)).keys(),
				num => 60 + num
			);
			const daysOfTheMonth = Array.from(
				Array(
					+formatDate(
						'd',
						getEndDayOfMonth(
							addMonth(dateCounter.value).toISOString()
						).toISOString()
					)
				).keys()
			);

			return buffer.concat(daysOfTheMonth);
		});
		const labelId = ref<string>('');
		const FormContext = inject<any>(FormProvider, undefined);
		const selected = ref(false);
		const today = formatTimeZone('yyyy-MM-dd');

		onMounted(() => {
			if (props.label && !!FormContext) {
				labelId.value = FormContext.setupForm(props.label, props.rules);
				FormContext.validateField(labelId.value, props.value, true);
			}
		});

		const setSelected = () => {
			selected.value = false;
		};

		watchEffect(() => {
			if (datePicker.value) {
				if (selected.value) {
					(datePicker.value as any).addEventListener(
						'click',
						(e: any) => e.stopPropagation()
					);
					setTimeout(() => {
						document.body.addEventListener('click', setSelected);
					}, 200);
				} else {
					(datePicker.value as any).removeEventListener(
						'click',
						(e: any) => e.stopPropagation()
					);
					document.body.removeEventListener('click', setSelected);
				}
			}
		});

		const error = computed(() => {
			if (FormContext && FormContext.formElements[labelId.value]) {
				return FormContext.formElements[labelId.value].error;
			}

			return null;
		});

		const setDay = (day: number) => day < 10 ? `0${day}` : day;

		const isSelected = (day: number) => {
			const result = `${dateTemplate.value}-${setDay(day)}`;
			return props.value === result;
		};

		const isToday = (day: number) => {
			const result = `${formatTimeZone('yyyy-MM', 'UTC')}-${setDay(day)}`;
			return today === result && dateCounter.value === 0;
		};

		const updateValue = (day: number) => {
			selected.value = false;
			const inputValue = `${dateTemplate.value}-${setDay(day)}`;
			if (FormContext) {
				FormContext.validateField(labelId.value, inputValue);
			}
			emit('update:value', inputValue);
		};

		return {
			dateCounter,
			dateHeader,
			datePicker,
			dayBegins,
			dayEnds,
			days,
			daysList,
			error,
			formatDate,
			formatTimeZone,
			isSelected,
			isToday,
			labelId,
			selected,
			updateValue,
		};
	},
});
</script>

<template>
	<div>
		<Label :error="error" :labelId="labelId" :label="label" />
		<div class="relative mt-2" ref="datePicker">
			<div
				class="absolute left-0 top-0 flex flex-col items-center justify-center h-full w-10 bg-gray-600 rounded-l-md"
			>
				<CalendarIcon class="w-5 h-5 text-white" />
			</div>
			<input
				:id="labelId"
				class="w-full py-2 pl-12 pr-2 text-gray-500 border rounded outline-none"
				:class="{
					'border-gray-300 focus:border-primary': !error,
					'border-red-600': error,
				}"
				type="text"
				:value="formatTimeZone('yyyy-MM-dd', 'UTC', value)"
				:autocomplete="type !== 'password' ? 'on' : 'off'"
				@click="selected = !selected"
				:aria-labelledby="labelId"
				readonly
			/>

			<div
				class="bg-white px-4 py-3 absolute left-0 top-0 w-64 min-h-64 shadow-2xl z-50 origin-top-left transform translate-y-12 transition ease-out duration-200"
				:class="{
					'scale-100 opacity-100': selected,
					'scale-0 opacity-0': !selected,
				}"
			>
				<div
					class="flex flex-row items-center justify-between text-gray-700"
				>
					<Button fab @click="dateCounter--">
						<ChevronLeftIcon class="cursor-pointer w-4 h-4" />
					</Button>
					<span class="text-sm">
						{{ formatDate('MMMM yyyy', dateHeader) }}
					</span>
					<Button
						fab
						@click="dateCounter++"
						class="translate-x-2 transform"
					>
						<ChevronRightIcon class="cursor-pointer w-4 h-4" />
					</Button>
				</div>

				<div class="grid-cols-7 gap-1 grid my-2">
					<span
						class="text-center text-sm text-gray-500"
						v-for="(day, index) in days"
						:key="index"
					>
						{{ day }}
					</span>
				</div>

				<div class="grid-cols-7 gap-1 grid">
					<div v-for="(date, index) in daysList" :key="index">
						<span v-if="date > 31">&nbsp;</span>
						<button
							v-if="date < 32"
							class="text-sm py-1 rounded-full text-center w-full focus:outline-none focus:shadow-outline"
							:class="{
								'text-gray-600 bg-white hover:bg-gray-200 border-0': false, //!isSelected(date) && !isToday(date),
								'text-white bg-primary border-0':
									isSelected(date + 1) || isToday(date + 1),
								'text-primary border border-primary': false, // isToday(date + 1) && !isSelected(date + 1),
							}"
							@click="updateValue(date + 1)"
						>
							{{ date + 1 }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<span v-if="error" class="text-sm text-red-600">{{ error }}</span>
	</div>
</template>
