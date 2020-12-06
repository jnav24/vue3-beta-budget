<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue';
import ChevronDownIcon from '@/components/ui-elements/icons/ChevronDownIcon.vue';
import { FormProvider } from '@/components/ui-elements/form/Form';
import Label from '@/components/ui-elements/form/Label.vue';

type SelectItems = Array<{ label: string; value: string }>;

export default defineComponent({
	components: {
		ChevronDownIcon,
		Label,
	},
	props: {
		label: {
			default: null,
			type: String,
		},
		rules: {
			default: () => ({}),
			type: Object,
		},
		items: {
			required: true,
			type: Array as () => SelectItems,
		},
		itemLabel: {
			default: 'label',
			type: String,
		},
		itemValue: {
			default: 'value',
			type: String,
		},
		placeholder: {
			default: 'Select',
			type: String,
		},
		value: {
			required: true,
			type: String,
		},
		isDisabled: {
			default: false,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const error = ref(false);
		const selected = ref(false);
		const dropDownItems = ref(null);
		const labelId = ref<string>('');
		const FormContext = inject<any>(FormProvider, undefined);

		onMounted(() => {
			(dropDownItems.value as any).classList.add('h-0', 'py-0');
			if (props.label && !!FormContext) {
				labelId.value = FormContext.setupForm(props.label, props.rules);
				FormContext.validateField(labelId.value, props.value);
			}
		});

		const isValueSelected = computed(
			() => props.value && (Number(props.value) > 0 || props.value.length)
		);

		const getPlaceholder = computed(() => {
			const text: any = props.items.find(
				(obj: any) => props.value === obj[props.itemValue]
			);

			if (isValueSelected.value && text && text[props.itemLabel]) {
				return text[props.itemLabel];
			}

			return props.placeholder;
		});

		const handleClick = () => {
			if (!props.isDisabled) {
				selected.value = !selected.value;
			}
		};

		const setValue = (value: string) => {
			if (FormContext) {
				error.value = FormContext.validateField(labelId.value, value);
			}
			emit('update:value', value);
			emit('set-item', value);
		};

		const blurEvent = () => {
			selected.value = false;
			setValue(props.value);
		};

		watch(selected, n => {
			if (!n) {
				setTimeout(
					() =>
						(dropDownItems.value as any).classList.add(
							'h-0',
							'py-0'
						),
					300
				);
			} else {
				(dropDownItems.value as any).classList.remove('h-auto', 'py-1');
			}
		});

		return {
			blurEvent,
			dropDownItems,
			error,
			getPlaceholder,
			handleClick,
			selected,
			setValue,
		};
	},
});
</script>

<template>
	<div>
		<Label :error="error" :labelId="labelId" :label="label" />
		<div
			class="border-solid border px-2 py-2 mt-2 rounded-md flex items-center justify-between outline-none transform relative"
			:class="{
				'bg-gray-200 border-gray-300 cursor-text text-gray-600': isDisabled,
				'border-gray-300 hover:border-gray-600 bg-white cursor-pointer text-gray-600 hover:text-gray-700 focus:border-primary transition duration-300':
					!error && !isDisabled,
				'border-red-600 bg-white text-red-600': error,
				'z-50': selected,
				'z-0': !selected,
			}"
			tabindex="0"
			@blur="blurEvent()"
			@click="handleClick()"
		>
			<span class="flex-1">{{ getPlaceholder }}</span>
			<ChevronDownIcon
				class="transform transition duration-300 h-6 w-6"
				:class="{
					'rotate-180': selected,
					'rotate-0': !selected,
				}"
			/>

			<div
				class="bg-white border border-gray-300 shadow-sm absolute transform top-0 left-0 rounded w-full transition ease-out duration-300 max-h-48 overflow-y-auto"
				:class="{
					'translate-y-12 opacity-100': selected,
					'translate-y-0 opacity-0': !selected,
				}"
				ref="dropDownItems"
			>
				<div
					v-for="(item, index) in items"
					:key="index"
					class="hover:bg-gray-200 p-2"
					@click="setValue(item[itemValue])"
				>
					{{ item[itemLabel] }}
				</div>
			</div>
		</div>
	</div>
</template>
