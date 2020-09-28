import useUtils from './useUtils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateRequired(val: string | number): boolean {
	return !!val.toString().trim();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isUppercasePresent(value: string): boolean {
	return /[A-Z]/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isLowercasePresent(value: string): boolean {
	return /[a-z]/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateSame(value: string, confirm: string): boolean {
	return value === confirm;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateNumeric(value: string): boolean {
	return /^\d+$/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateMax(value: string, characters: string) {
	return value.length < Number(characters);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateMin(value: string, characters: string) {
	return value.length > Number(characters);
}

export default function useFormValidation() {
	const defaultErrorMessages: Record<string, string> = {
		required: 'Field is required',
		email: 'Must be a valid email address',
		max: 'Field can not exceed ##REPLACE## characters',
		min: 'Field should be ##REPLACE## or more characters',
	};

	const setMessage = (message: string, rep: string) =>
		message.replace('##REPLACE##', rep);

	const getTypeAndParam = (type: string): string[] => type.split(':');

	const validateInput = (type: string, value: string): boolean => {
		const [validationType, validationParam] = getTypeAndParam(type);
		const func: any = `validate${useUtils().ucFirst(validationType)}`;

		try {
			return validationParam
				? eval(func)(value, validationParam)
				: eval(func)(value);
		} catch (err) {
			throw `Function for type '${validationType}', does not exist`;
		}
	};

	const validateRules = (
		inputValue: string,
		rules: Record<string, string>
	): { error: null | string; valid: boolean } => {
		let tempValid = true;
		let error = null;

		for (const [key, value] of Object.entries(rules)) {
			const isNumeric = validateNumeric(key);
			const type = isNumeric ? value : key;
			const [validationType, validationParams] = getTypeAndParam(type);
			const message = isNumeric
				? setMessage(
						defaultErrorMessages[validationType] ??
							defaultErrorMessages.required,
						validationParams ?? ''
				  )
				: value;
			const isValid = validateInput(type, inputValue);

			if (!tempValid) {
				continue;
			}

			if (!isValid && tempValid) {
				error = message;
				tempValid = false;
				continue;
			}

			error = null;
			tempValid = true;
		}

		return {
			error,
			valid: tempValid,
		};
	};

	return { validateInput, validateRules };
}
