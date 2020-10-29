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

<style scoped>
.animated {
	-webkit-animation-duration: 0.3s;
	animation-duration: 0.3s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

.slideover-enter-active,
.slideover-leave-active {
	@apply transition-opacity duration-500 ease-out;
}

.slideover-enter-from,
.slideover-leave-to {
	@apply opacity-0;
}

@keyframes slideOutRight {
	from {
		transform: translate3d(0, 0, 0);
	}

	to {
		visibility: hidden;
		transform: translate3d(100%, 0, 0);
	}
}

.slideOutRight {
	animation-name: slideOutRight;
}

@keyframes slideInRight {
	from {
		transform: translate3d(100%, 0, 0);
		visibility: visible;
	}

	to {
		transform: translate3d(0, 0, 0);
	}
}

.slideInRight {
	animation-name: slideInRight;
}
</style>

<template>
	<transition name="slideover" @enter="showContent = true">
		<div class="fixed z-100 inset-0 overflow-hidden" v-if="show">
			<div class="absolute inset-0 overflow-hidden">
				<div
					class="absolute inset-0 bg-black opacity-75"
					@click="closeModal()"
				></div>

				<section
					class="absolute inset-y-0 right-0 pl-0 md:pl-10 max-w-full flex"
				>
					<div class="relative w-screen max-w-md">
						<transition
							name="slideover-panel"
							enter-active-class="animated slideInRight"
							leave-active-class="animated slideOutRight"
						>
							<div
								class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll"
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
