<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue';
import ChevronDownIcon from '@/components/ui-elements/icons/ChevronDownIcon.vue';
import { FormProvider } from '@/components/ui-elements/form/Form';

export default defineComponent({
	components: {
		ChevronDownIcon,
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
			type: () => [],
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
	},
	setup(props, { emit }) {
		const error = ref(false);
		const selected = ref(false);
		const dropDownItems = ref(null);
		const currentValue = ref('');
		const labelId = ref(null);
		const { isFormValid, setFormElement, setFormId } = inject<any>(
			FormProvider
		);

		onMounted(() => {
			(dropDownItems.value as any).classList.add('h-0', 'py-0');
			currentValue.value = props.value;
			if (props.label) {
				labelId.value = setFormId(props.label);
				setFormElement(labelId.value, !props.rules);
			}
		});

		const isValueSelected = computed(
			() => currentValue.value && currentValue.value.length
		);

		const getPlaceholder = computed(() => {
			const text: any = props.items.find(
				(obj: any) => currentValue.value === obj.value
			);
			if (isValueSelected.value && text && text.label) {
				return text.label;
			}

			return props.placeholder;
		});

		const setValue = (value: string) => {
			currentValue.value = value;
			isFormValid();
			emit('update:value', value);
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
			currentValue,
			dropDownItems,
			error,
			getPlaceholder,
			selected,
			setValue,
		};
	},
});
</script>

<template>
	<div
		class="border-solid border cursor-pointer px-2 py-2 w-40 rounded-md flex items-center justify-between mr-3 outline-none transform relative"
		:class="{
			'border-gray-300 hover:border-gray-600 text-gray-600 hover:text-gray-700 focus:border-primary transition duration-300': !error,
			'border-red-600': error,
		}"
		tabindex="0"
		@blur="selected = false"
		@click="selected = !selected"
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
			class="bg-white border border-gray-300 shadow-sm absolute transform top-0 left-0 rounded overflow-hidden w-full transition ease-out duration-300"
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
				@click="setValue(item.value)"
			>
				{{ item.label }}
			</div>
		</div>
	</div>
</template>
