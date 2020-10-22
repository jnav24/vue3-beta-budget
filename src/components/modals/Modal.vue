<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	props: {
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

		return {
			closeModal,
			showContent,
		};
	},
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
	@apply transition-opacity duration-500 ease-out;
}

.modal-enter-from,
.modal-leave-to {
	@apply opacity-0;
}

@-webkit-keyframes fadeInUp {
	from {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
	}

	to {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
	}

	to {
		opacity: 1;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}
}

@-webkit-keyframes fadeOutDown {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
	}
}

@keyframes fadeOutDown {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
		-webkit-transform: translate3d(0, 100%, 0);
		transform: translate3d(0, 100%, 0);
	}
}

.fadeOutDown {
	-webkit-animation-name: fadeOutDown;
	animation-name: fadeOutDown;
}

.animated {
	-webkit-animation-duration: 0.3s;
	animation-duration: 0.3s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

.fadeInUp {
	-webkit-animation-name: fadeInUp;
	animation-name: fadeInUp;
}
</style>

<template>
	<transition name="modal" @enter="showContent = true">
		<div class="fixed z-100 inset-0 overflow-y-auto" v-if="show">
			<div
				class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
			>
				<div class="fixed inset-0">
					<div
						class="absolute inset-0 bg-black opacity-75"
						@click="closeModal()"
					></div>
				</div>

				<!-- This element is to trick the browser into centering the modal contents. -->
				<span
					class="hidden sm:inline-block sm:align-middle sm:h-screen"
				></span>
				&#8203;

				<transition
					name="modal-slideUp"
					enter-active-class="animated fadeInUp"
					leave-active-class="animated fadeOutDown"
				>
					<div
						class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-headline"
						v-show="showContent"
					>
						<slot></slot>
					</div>
				</transition>
			</div>
		</div>
	</transition>
</template>
