import useUtils from './useUtils';

export default function useFormValidation() {
	const validateInput = (type: string, value: string): string | boolean => {
		const func: any = `validate${useUtils().ucFirst(type)}`;

		if (typeof eval(func) === 'function') {
			return eval(func)(value);
		}

		return '';
	};

	const validateRules = (
		value: string,
		rules: Record<string, string>
	): { error: null | string; valid: boolean } => {
		let tempValid = true;
		let error = null;

		for (const [type, message] of Object.entries(rules)) {
			const isValid = validateInput(type, value);

			if (!tempValid) {
				continue;
			}

			if ((!isValid || typeof isValid !== 'boolean') && tempValid) {
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
	return /\d/.test(value);
}
