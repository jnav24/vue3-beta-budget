<script lang="ts">
import { defineComponent } from 'vue';

type LinkItems = { label: string; value: string };

export default defineComponent({
	props: {
		title: {
			required: true,
			type: String,
		},
		items: {
			required: true,
			type: Array as () => Array<LinkItems>,
		},
		itemLabel: {
			default: 'label',
			type: String,
		},
		itemValue: {
			default: 'value',
			type: String,
		},
		notifications: {
			default: () => ({}),
			type: Object as () => Record<string, number>,
		},
		selectedItem: {
			required: true,
			type: String,
		},
	},
	setup(props, { emit }) {
		const emitSelected = (e: string) => {
			emit('update:selected-item', e);
			emit('set-item', e);
		};

		return { emitSelected };
	},
});
</script>

<template>
	<div class="py-4 hidden md:block">
		<p class="mb-6 text-lg text-gray-700 font-body">{{ title }}</p>

		<ul>
			<li
				class="flex flex-row items-center justify-between"
				v-for="(item, int) in items"
				:key="int"
				:class="{
					'text-gray-500 text-sm hover:text-gray-700 hover:bg-gray-100 cursor-pointer px-2 py-2':
						item[itemValue] !== selectedItem,
					'text-gray-700 text-sm cursor-pointer px-2 py-2 bg-gray-300 rounded':
						item[itemValue] === selectedItem,
				}"
				@click="emitSelected(item[itemValue])"
			>
				<span>{{ item[itemLabel] }}</span>
				<span
					class="bg-danger text-white text-center rounded-full px-2 h-6 ml-2 min-w-6"
					v-if="
						Object.keys(notifications).length &&
							notifications[item[itemValue]]
					"
				>
					{{ notifications[item[itemValue]] }}
				</span>
			</li>
		</ul>
	</div>
</template>
