import useGlobal from './useGlobal';

export default function useFormValidation() {
	const validateInput = (type: string, value: string): string | boolean => {
		const func: any = `validate${useGlobal().ucFirst(type)}`;

		if (typeof eval(func) === 'function') {
			return eval(func)(value);
		}

		return '';
	};

	return { validateInput };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateRequired(val: string | number): boolean {
	return !!val.toString().trim();
}
