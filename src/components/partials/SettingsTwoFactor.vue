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
			title="Two Factor Authentication"
			description="Add additional security to your account by using two factor authentication"
		>
			hello
		</SettingsLayout>
	</section>
</template>
