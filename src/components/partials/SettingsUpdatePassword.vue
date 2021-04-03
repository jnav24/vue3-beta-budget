<script lang="ts">
import { defineComponent } from 'vue';
import SettingsLayout from '@/components/layouts/SettingsLayout.vue';

export default defineComponent({
	components: {
		SettingsLayout,
	},
});
</script>

<template>
	<SettingsLayout
		title="Update Password"
		description="Ensure your account is using a long, random password to stay secure."
	></SettingsLayout>
</template>
