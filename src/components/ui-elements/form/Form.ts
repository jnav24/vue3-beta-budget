import { defineComponent, provide } from 'vue';
import useFormValidation from '@/hooks/useFormValidation';

export const FormProvider = Symbol('Form Provider');

export default defineComponent({
	props: {
		valid: {
			required: true,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const formElements: Record<
			string,
			{ valid: boolean; rules: Record<string, string> }
		> = {};
		const updateValid = (isValid: boolean) => {
			emit('update:valid', isValid);
		};

		const setFormElement = (
			name: string,
			rules: Record<string, string>
		): void => {
			formElements[name] = {
				rules,
				valid: !rules.length,
			};
		};

		const setFormId = (name: string): string =>
			name.toLowerCase().replace(/\s+/, '-');

		const setupForm = (label: string, rules: any) => {
			const labelId = setFormId(label);
			setFormElement(labelId, rules);
			return labelId;
		};

		const isFormValid = () => {
			const keys = Object.keys(formElements);
			const valid = Object.values(formElements).filter(
				(elem: { valid: boolean; rules: Record<string, string> }) =>
					elem.valid
			);
			updateValid(keys.length === valid.length);
		};

		const validateField = (
			labelId: string,
			value: string
		): string | null => {
			const { validateRules } = useFormValidation();
			if (!labelId || !labelId.length || !formElements[labelId]) {
				return null;
			}

			const { rules } = formElements[labelId];
			const { error, valid } = validateRules(value, rules);
			formElements[labelId].valid = valid;
			isFormValid();
			return error;
		};

		provide(FormProvider, { validateField, setupForm });
	},
	render() {
		return (this as any).$slots.default();
	},
});
