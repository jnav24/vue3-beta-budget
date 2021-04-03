<script lang="ts">
import { defineComponent } from 'vue';
import SettingsProfile from '@/components/partials/SettingsProfile.vue';
import SettingsUpdatePassword from '@/components/partials/SettingsUpdatePassword.vue';

export default defineComponent({
	components: {
		SettingsProfile,
		SettingsUpdatePassword,
	},
});
</script>

<template>
	<section class="container mx-auto">
		<SettingsProfile />
		<SettingsUpdatePassword />
	</section>
</template>
