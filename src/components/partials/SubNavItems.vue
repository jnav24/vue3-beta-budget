<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
	props: {
		icon: {
			default: null,
		},
		items: {
			required: true,
			type: Object,
		},
		show: {
			required: true,
			type: Boolean,
		},
	},
	setup(props) {
		const subNav = ref(null);

		onMounted(() => (subNav.value as any).classList.add('h-0', 'py-0'));

		watch(
			() => props.show,
			n => {
				if (!n) {
					setTimeout(
						() =>
							(subNav.value as any).classList.add('h-0', 'py-0'),
						400
					);
				} else {
					(subNav.value as any).classList.remove('h-auto', 'py-1');
				}
			}
		);

		return { subNav };
	},
});
</script>

<template>
	<div
		ref="subNav"
		class="absolute origin-top w-full overflow-hidden bg-white transition delay-100 duration-300 ease-out transform rounded-lg shadow-lg"
		:class="{
			'translate-y-16 opacity-0': !show,
			'translate-y-2 opacity-100': show,
		}"
	>
		<router-link
			v-for="(link, i) in items"
			:key="i"
			:to="link.value"
			class="px-2 py-1 block text-sm text-gray-700 hover:bg-gray-200"
			>{{ link.label }}</router-link
		>
	</div>
</template>
