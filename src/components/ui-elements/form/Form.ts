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
		const { validateRules } = useFormValidation();

		let matchFields: Record<string, string> = {};
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

		const getMatchId = (rules: Record<string, string>) => {
			let matchId: string | null = null;

			const keys = Object.keys(rules).filter(str =>
				str.includes('match')
			);
			const values = Object.values(rules).filter(str =>
				str.includes('match')
			);

			if (keys.length && keys[0].includes(':')) {
				matchId = keys[0].split(':')[1];
			}

			if (values.length && values[0].includes(':')) {
				matchId = values[0].split(':')[1];
			}

			return matchId;
		};

		const setMatchFields = (
			labelId: string,
			rules: Record<string, string>
		) => {
			const result: Record<string, string> = {};
			const matchId = getMatchId(rules);

			if (matchId) {
				result[matchId] = labelId;
			}

			return result;
		};

		const setupForm = (label: string, rules: any) => {
			const labelId = setFormId(label);
			setFormElement(labelId, rules);
			matchFields = {
				...matchFields,
				...setMatchFields(labelId, rules),
			};
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

		const setMatchRules = (rules: Record<string, string>) => {
			const valuesIndex = Object.values(rules).findIndex(rule =>
				rule.includes('match')
			);

			const matchKey = Object.keys(rules).filter(str =>
				str.includes('match')
			);

			if (matchKey.length) {
				const result = { ...rules };
				const formName = matchKey[0].split(':')[1];
				delete result[matchKey[0]];
				return {
					...result,
					[`match:${formName}|${formElements[formName].value}`]: rules[
						matchKey[0]
					],
				};
			}

			if (valuesIndex > -1) {
				const result = { ...rules };
				const formName = result[valuesIndex].split(':')[1];
				result[
					valuesIndex
				] = `match:${formName}|${formElements[formName].value}`;
				return result;
			}

			return rules;
		};

		const validateField = (
			labelId: string,
			value: string,
			initialize = false
		): string | null => {
			if (!labelId || !labelId.length || !formElements[labelId]) {
				return null;
			}

			const { rules } = formElements[labelId];
			const { error, valid } = validateRules(value, setMatchRules(rules));
			formElements[labelId].valid = valid;
			formElements[labelId].value = value;

			if (!initialize) {
				formElements[labelId].error = error;
			}

			if (matchFields[labelId] && formElements[matchFields[labelId]]) {
				validateField(
					matchFields[labelId],
					formElements[matchFields[labelId]].value
				);
			}

			isFormValid();
			return error;
		};

		provide(FormProvider, {
			validateField,
			setupForm,
			formElements: readonly(formElements),
		});
	},
	render() {
		return (this as any).$slots.default();
	},
});
