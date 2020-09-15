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

	return { arrayColumn, ucFirst };
}
