<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import Alert from '@/components/ui-elements/Alert.vue';
import { Form } from '@/components/ui-elements';
import Input from '@/components/ui-elements/form/Input.vue';
import LoaderIcon from '@/components/ui-elements/icons/LoaderIcon.vue';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
	components: {
		Alert,
		Form,
		Input,
		LoaderIcon,
	},
	setup(props, { emit }) {
		const { logUserIn } = useUserStore();
		const { push } = useRouter();
		const disableSubmit = ref(false);
		const error = reactive({
			display: false,
			message: '',
		});
		const form = reactive({
			email: {
				rules: [],
				value: 'red2433021@yahoo.com',
			},
			password: {
				rules: {},
				value: 'password',
			},
		});
		const valid = ref(false);

		const login = async () => {
			disableSubmit.value = true;
			const response = await logUserIn({
				username: form.email.value,
				password: form.password.value,
			});

			if (response.success) {
				if (response.data.two_factor) {
					emit('handle-two-factor');
				} else {
					error.display = false;
					error.message = '';
					push({ name: 'home' });
				}
			} else {
				error.display = true;
				error.message = response.error;
				disableSubmit.value = false;
			}
		};

		return { disableSubmit, error, form, login, valid };
	},
});
</script>

<template>
	<div class="pb-6 px-0 sm:px-6 sm:shadow-sm">
		<h1
			class="text-center text-2xl text-gray-800 sm:text-gray-600 font-header mb-8"
		>
			Welcome Back
		</h1>

		<Alert type="error" :message="error.message" v-if="error.display" />

		<Form v-model:valid="valid">
			<Input
				label="Email"
				v-model:value="form.email.value"
				:rules="form.email.rules"
			/>
			<Input
				label="Password"
				type="password"
				v-model:value="form.password.value"
				:rules="form.password.rules"
			/>
			<button
				@click="login()"
				class="w-full py-2 rounded flex flex-row items-center justify-center"
				type="button"
				:disabled="!valid || disableSubmit"
				:class="{
					'bg-secondary shadow-md': valid && !disableSubmit,
					'bg-gray-300 text-gray-600': !valid || disableSubmit,
				}"
			>
				<LoaderIcon
					v-if="disableSubmit"
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600"
				/>
				<span v-if="!disableSubmit">Login</span>
			</button>
		</Form>
	</div>

	<div
		class="py-4 px-6 sm:bg-gray-100 flex flex-row justify-center sm:justify-end items-center"
	>
		<router-link
			class="text-gray-700 underline text-sm hover:no-underline"
			:to="{ name: 'forgot-password' }"
		>
			Forgot Password?
		</router-link>
	</div>
</template>
