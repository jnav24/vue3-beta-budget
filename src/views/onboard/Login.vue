<script lang="ts">
import { defineComponent } from 'vue';
import Input from '@/components/ui-elements/form/Input.vue';

export default defineComponent({
	components: {
		Input,
	},
});
</script>

<template>
	<Input label="Email" />
	<Input label="Password" type="password" />
</template>
