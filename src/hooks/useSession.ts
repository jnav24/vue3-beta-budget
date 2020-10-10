export default function useSession() {
	const setCookie = (name: string, value: string) => {
		const d = new Date();
		d.setTime(d.getTime() + 1000 * 60 * 60 * 24);
		const expire = d.toString();
		document.cookie = `${name}=${value}; expires=${expire}; path=/; SameSite=Strict; domain=`;
	};

	return { setCookie };
}
