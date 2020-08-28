import { defineComponent, provide } from 'vue';

export const FormProvider = Symbol('Form Provider');

export default defineComponent({
	props: {
		valid: {
			required: true,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const updateValid = (isValid: boolean) => {
			emit('update:valid', isValid);
		};

		provide(FormProvider, updateValid);
	},
	render() {
		return (this as any).$slots.default();
	},
});
