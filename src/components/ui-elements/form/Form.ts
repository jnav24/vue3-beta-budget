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
		const formElements: Record<string, boolean> = {};
		const updateValid = (isValid: boolean) => {
			emit('update:valid', isValid);
		};

		const setFormElement = (name: string, val: boolean): void => {
			formElements[name] = val;
		};

		const isFormValid = () => {
			const keys = Object.keys(formElements);
			const valid = Object.values(formElements).filter(
				(val: boolean) => val
			);
			updateValid(keys.length === valid.length);
		};

		provide(FormProvider, { isFormValid, setFormElement });
	},
	render() {
		return (this as any).$slots.default();
	},
});
