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
	<section class="pt-12">
		<SettingsLayout
			title="Profile Information"
			description="Update your account's profile information and email address."
		></SettingsLayout>
	</section>
</template>
