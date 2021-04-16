<script lang="ts">
import { defineComponent, watch } from 'vue';

export default defineComponent({
	props: {
		show: {
			required: true,
			type: Boolean,
		},
		isSuccess: {
			required: true,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		watch(
			() => props.show,
			newValue => {
				if (newValue) {
					setTimeout(() => emit('update:show', false), 5000);
				}
			}
		);
	},
});
</script>

<template>
	<p
		class="mr-4 transition duration-150 ease-out-in"
		:class="{
			'text-primary': isSuccess,
			'text-danger': !isSuccess,
			'opacity-0': !show,
			'opacity-100': show,
		}"
	>
		{{ isSuccess ? 'Saved!' : 'Error' }}
	</p>
</template>
