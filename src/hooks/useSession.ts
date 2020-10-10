export default function useSession() {
	const setCookie = (name: string, value: string) => {
		const d = new Date();
		d.setTime(d.getTime() + 1000 * 60 * 60 * 24);
		const expire = d.toString();
		document.cookie = `${name}=${value}; expires=${expire}; path=/; SameSite=Strict; domain=`;
	};

	const deleteCookie = (name: string) => {
		const d = new Date();
		d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
		const expires = 'expires=' + d.toString();
		document.cookie = `${name} =; ${expires}; path=/; Max-Age=-99999999;`;
	};

	const resetCookies = () => {
		const newCookies = {};
		const cookieList: string[] = document.cookie
			.replace(/\s+/, '')
			.split(';');

		for (const cookie of cookieList) {
			const [name, value] = cookie.split('=');
			(newCookies as any)[name] = value;
			deleteCookie(name);
		}

		for (const cook of Object.keys(newCookies)) {
			if (cook.trim() !== '') {
				setCookie(cook, (newCookies as any)[cook]);
			}
		}
	};

	const getCookie = (name: string): string | null => {
		resetCookies();
		const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
		if (match) {
			return match[1];
		}

		return null;
	};

	return { deleteCookie, getCookie, setCookie };
}
