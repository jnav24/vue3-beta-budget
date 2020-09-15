<script lang="ts">
import { defineComponent } from 'vue';

type LinkItems = Array<{ label: string; value: string }>;

export default defineComponent({
	props: {
		title: {
			required: true,
			type: String,
		},
		items: {
			required: true,
			type: () => Array as () => LinkItems,
		},
		selectedItem: {
			required: true,
			type: String,
		},
	},
	setup(props, { emit }) {
		const emitSelected = (e: string) => {
			emit('update:selected-item', e);
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
				v-for="(item, int) in items"
				:key="int"
				:class="{
					'text-gray-500 text-sm hover:text-gray-700 cursor-pointer px-2 py-2':
						item.value !== selectedItem,
					'text-gray-700 text-sm cursor-pointer px-2 py-2 bg-gray-300 rounded':
						item.value === selectedItem,
				}"
				@click="emitSelected(item.value)"
			>
				{{ item.label }}
			</li>
		</ul>
	</div>
</template>
