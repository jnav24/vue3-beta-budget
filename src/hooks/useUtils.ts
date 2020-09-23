export default function useUtils() {
	const ucFirst = (val: string): string =>
		val.charAt(0).toUpperCase() + val.slice(1);

	const arrayColumn = <S extends keyof R, R extends Record<string, string>>(
		val: S,
		arr: Array<R>
	): Array<R[S]> => {
		return arr
			.map((obj: R) => obj[val] ?? null)
			.filter((value: R[S]) => value);
	};

	const toTitleCase = (value: string, casing = '-'): string => {
		return value
			.split(casing)
			.map(word => ucFirst(word))
			.join(' ');
	};

	return { arrayColumn, toTitleCase, ucFirst };
}
