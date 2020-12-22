<script lang="ts">
import { computed, defineComponent } from 'vue';
import LoginModal from '@/components/modals/LoginModal.vue';
import Nav from '@/components/partials/Nav.vue';
import { useUserStore } from '@/store';

export default defineComponent({
	components: {
		LoginModal,
		Nav,
	},
	setup() {
		const userStore = useUserStore();
		const showLoginModal = computed(() => userStore.login.timeout);
		return {
			showLoginModal,
		};
	},
});
</script>

<template>
	<Nav />

	<LoginModal :show="showLoginModal" />

	<div class="bg-gray-200 h-screen overflow-y-auto pb-32">
		<router-view />
	</div>
</template>
