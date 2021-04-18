<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginForm from '@/components/partials/forms/LoginForm.vue';
import TwoFactor from '@/components/partials/forms/TwoFactor.vue';

export default defineComponent({
	components: {
		LoginForm,
		TwoFactor,
	},
	setup() {
		const showTwoFactor = ref(false);
		return { showTwoFactor };
	},
});
</script>

<template>
	<LoginForm
		v-if="!showTwoFactor"
		@handle-two-factor="showTwoFactor = true"
	/>
	<TwoFactor v-if="showTwoFactor" />
</template>
