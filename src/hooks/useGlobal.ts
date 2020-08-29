export default function useGlobal() {
	const ucFirst = (val: string): string =>
		val.charAt(0).toUpperCase() + val.slice(1);

	return { ucFirst };
}
