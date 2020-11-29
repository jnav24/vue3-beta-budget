<script lang="ts">
import {
	defineComponent,
	defineAsyncComponent,
	onMounted,
	ref,
	watch,
} from 'vue';

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
	setup(props, { emit }) {
		const subNav = ref(null);

		onMounted(() => (subNav.value as any).classList.add('h-0', 'py-0'));

		const getIcon = (icon: string) => {
			return defineAsyncComponent({
				loader: () =>
					import(`@/components/ui-elements/icons/${icon}.vue`),
			});
		};

		const handleClick = (value: string) => {
			emit('nav-clicked', value);
		};

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

		return { getIcon, handleClick, subNav };
	},
});
</script>

<template>
	<div
		ref="subNav"
		class="absolute right-0 sm:right-auto w-32 sm:w-full overflow-hidden bg-white transition delay-100 duration-300 ease-out transform rounded-lg shadow-lg"
		:class="{
			'translate-y-16 opacity-0': !show,
			'translate-y-2 opacity-100': show,
		}"
	>
		<div v-for="(link, i) in items" :key="i">
			<router-link
				v-if="link.to"
				:to="link.to"
				class="px-2 py-3 flex flex-row justify-start items-center text-sm text-gray-600 hover:bg-gray-200"
			>
				<component :is="getIcon(link.icon)" class="w-4 h-4" />
				<span class="ml-2">{{ link.label }}</span>
			</router-link>

			<div
				v-else
				class="px-2 py-3 flex flex-row justify-start items-center text-sm text-gray-600 hover:bg-gray-200 cursor-pointer"
				@click="handleClick(link.value ?? '')"
			>
				<component :is="getIcon(link.icon)" class="w-4 h-4" />
				<span class="ml-2">{{ link.label }}</span>
			</div>
		</div>
	</div>
</template>
