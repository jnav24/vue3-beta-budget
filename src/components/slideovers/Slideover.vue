<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
	props: {
		setClose: {
			default: false,
			type: Boolean,
		},
		show: {
			required: true,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const showContent = ref(false);

		const closeModal = () => {
			showContent.value = false;
			setTimeout(() => emit('close', false), 200);
		};

		watch(
			() => props.setClose,
			n => n && closeModal()
		);

		return { closeModal, showContent };
	},
});
</script>

<template>
	<transition name="modal" @enter="showContent = true">
		<div class="fixed z-100 inset-0 overflow-hidden" v-if="show">
			<div class="absolute inset-0 overflow-hidden">
				<div
					class="absolute inset-0 bg-black opacity-75"
					@click="closeModal()"
				></div>

				<section
					class="absolute inset-y-0 right-0 pl-10 max-w-full flex"
				>
					<div class="relative w-screen max-w-md">
						<transition
							name="modal-slideUp"
							enter-active-class="animated fadeInUp"
							leave-active-class="animated fadeOutDown"
						>
							<div
								class="h-full flex flex-col space-y-6 py-6 bg-white shadow-xl overflow-y-scroll"
								role="dialog"
								aria-modal="true"
								aria-labelledby="slideover-content"
								v-show="showContent"
							>
								<slot></slot>
							</div>
						</transition>
					</div>
				</section>
			</div>
		</div>
	</transition>
</template>
