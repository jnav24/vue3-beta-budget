import { defineComponent, provide, reactive, readonly } from 'vue';
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
			{
				valid: boolean;
				rules: Record<string, string>;
				error: string | null;
				value: string;
			}
		> = reactive({});
		const updateValid = (isValid: boolean) => {
			emit('update:valid', isValid);
		};

		const setFormElement = (
			name: string,
			rules: Record<string, string>,
			value = ''
		): void => {
			formElements[name] = {
				rules,
				valid: !rules.length,
				error: null,
				value,
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
			value: string,
			initialize = false
		): string | null => {
			const { validateRules } = useFormValidation();
			if (!labelId || !labelId.length || !formElements[labelId]) {
				return null;
			}

			const { rules } = formElements[labelId];
			const { error, valid } = validateRules(value, rules);
			formElements[labelId].valid = valid;
			formElements[labelId].value = value;

			if (!initialize) {
				formElements[labelId].error = error;
			}

			isFormValid();
			return error;
		};

		provide(FormProvider, { validateField, setupForm, formElements: readonly(formElements) });
	},
	render() {
		return (this as any).$slots.default();
	},
});
