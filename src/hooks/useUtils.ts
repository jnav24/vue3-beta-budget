export default function useUtils() {
	const ucFirst = (val: string): string =>
		val.charAt(0).toUpperCase() + val.slice(1);

	const arrayColumn = (
		val: string,
		arr: Array<Record<string, any>>
	): string[] => {
		return arr
			.map((obj: any) => obj[val] ?? null)
			.filter((value: any) => value);
	};

	return { arrayColumn, ucFirst };
}
