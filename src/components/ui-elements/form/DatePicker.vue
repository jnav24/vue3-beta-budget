<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue';
import { FormProvider } from '@/components/ui-elements/form/Form';
import Label from '@/components/ui-elements/form/Label.vue';
import CalendarIcon from '@/components/ui-elements/icons/CalendarIcon.vue';
import ChevronLeftIcon from '@/components/ui-elements/icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@/components/ui-elements/icons/ChevronRightIcon.vue';

export default defineComponent({
	components: {
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
		const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
		const labelId = ref<string>('');
		const FormContext = inject<any>(FormProvider, undefined);
		const selected = ref(true);

		onMounted(() => {
			if (props.label && !!FormContext) {
				labelId.value = FormContext.setupForm(props.label, props.rules);
				FormContext.validateField(labelId.value, props.value, true);
			}
		});

		const error = computed(() => {
			if (FormContext && FormContext.formElements[labelId.value]) {
				return FormContext.formElements[labelId.value].error;
			}

			return null;
		});

		const updateValue = (inputValue: string) => {
			if (FormContext) {
				FormContext.validateField(labelId.value, inputValue);
			}
			emit('update:value', inputValue);
		};

		return {
			days,
			error,
			labelId,
			selected,
			updateValue,
			updateValueOnBlur: (e: string) => {
				selected.value = false;
				updateValue(e);
			},
		};
	},
});
</script>

<template>
	<div>
		<Label :error="error" :labelId="labelId" :label="label" />
		<div class="relative mt-2">
			<div
				class="absolute left-0 top-0 flex flex-col items-center justify-center h-full w-10 bg-gray-600 rounded-l-md"
				@click="selected = !selected"
			>
				<CalendarIcon class="w-5 h-5 text-white" />
			</div>
			<input
				:id="labelId"
				class="w-full p-2 border rounded outline-none"
				:class="{
					'border-gray-300 focus:border-primary': !error,
					'border-red-600': error,
				}"
				type="text"
				:value="value"
				:autocomplete="type !== 'password' ? 'on' : 'off'"
				@click="selected = !selected"
				@blur="updateValueOnBlur($event.target.value)"
				@input="updateValue($event.target.value)"
				:aria-labelledby="labelId"
				readonly
			/>

			<div
				class="bg-white p-4 absolute left-0 bottom-0 w-64 h-64 shadow-2xl z-50 origin-top-left transform translate-y-64 transition ease-out duration-200"
				:class="{
					'scale-100 opacity-100': selected,
					'scale-0 opacity-0': !selected,
				}"
			>
				<div
					class="flex flex-row items-center justify-between text-gray-700"
				>
					<ChevronLeftIcon class="w-4 h-4" />
					<span class="text-sm">October 2020</span>
					<ChevronRightIcon class="w-4 h-4" />
				</div>

				<div class="grid-cols-7 gap-1 grid">
					<span
						class="text-center text-sm text-gray-500"
						v-for="(day, index) in days"
						:key="index"
					>
						{{ day }}
					</span>
				</div>

				<div class="grid-cols-7 gap-1 grid"></div>
			</div>
		</div>
		<span v-if="error" class="text-sm text-red-600">{{ error }}</span>
	</div>
</template>
