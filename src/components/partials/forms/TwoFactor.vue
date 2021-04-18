<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Alert from '@/components/ui-elements/Alert.vue';
import { Form } from '@/components/ui-elements';
import Input from '@/components/ui-elements/form/Input.vue';
import LoaderIcon from '@/components/ui-elements/icons/LoaderIcon.vue';
import useHttp from '@/hooks/useHttp';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
	components: {
		Alert,
		Form,
		Input,
		LoaderIcon,
	},
	setup() {
		const userStore = useUserStore();
		const { push } = useRouter();
		const alert = reactive({
			display: false,
			message: '',
		});
		const totp = ref('');
		const disableSubmit = ref(false);
		const isValid = ref(false);

		const handleClick = async () => {
			disableSubmit.value = true;
			const { post } = useHttp();
			const { success, error } = await post({
				path: 'two-factor-challenge',
				params: {
					code: totp.value,
				},
			});

			if (!success) {
				alert.display = true;
				alert.message = error;
				disableSubmit.value = false;
			} else {
				await userStore.getToken();
				push({ name: 'home' });
			}
		};

		return { alert, disableSubmit, handleClick, isValid, totp };
	},
});
</script>

<template>
	<div class="pb-6 px-0 sm:px-6 sm:shadow-sm">
		<h1
			class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8"
		>
			2-Step Auth
		</h1>

		<Alert type="error" :message="alert.message" v-if="alert.display" />

		<Form v-model:valid="isValid">
			<Input
				label="Enter 6 digit code"
				v-model:value="totp"
				:rules="['required', 'numeric', 'max:6', 'min:6']"
			/>

			<button
				@click="handleClick()"
				class="w-full py-2 rounded flex flex-row items-center justify-center"
				type="button"
				:disabled="!isValid || disableSubmit"
				:class="{
					'bg-secondary shadow-md': isValid && !disableSubmit,
					'bg-gray-300 text-gray-600': !isValid || disableSubmit,
				}"
			>
				<LoaderIcon
					v-if="disableSubmit"
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600"
				/>
				<span v-if="!disableSubmit">Verify</span>
			</button>
		</Form>
	</div>
</template>
