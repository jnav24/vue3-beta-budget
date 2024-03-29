import useEncrypt from '@/hooks/useEncrypt';

export default function useSession() {
	const setCookie = (name: string, value: string, minutes = '') => {
		const { encryptCookie } = useEncrypt();

		const d = new Date();
		let expire = '';
		const secure =
			process.env.NODE_ENV === 'production' &&
			location.protocol === 'https:'
				? 'secure; '
				: '';

		if (minutes && minutes.length && /^\d+$/.test(minutes)) {
			const expirationTime = +minutes * 60000;
			d.setTime(d.getTime() + expirationTime);
			expire = `expires=${d.toUTCString()}; `;
		}

		const encryptedValue = encryptCookie(value);
		document.cookie = `${name}=${encryptedValue}; path=/; SameSite=Strict; domain=;${expire}${secure}`;
	};

	const deleteCookie = (name: string) => {
		const d = new Date();
		d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
		const expires = 'expires=' + d.toString();
		document.cookie = `${name} =; ${expires}; path=/; Max-Age=-99999999;`;
	};

	const getCookie = (name: string): string | null => {
		// resetCookies();
		const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
		if (match) {
			return match[1];
		}

		return null;
	};

	const getStorage = (name: string): string | null => {
		return localStorage.getItem(name);
	};

	const setStorage = (name: string, value: string): void => {
		localStorage.setItem(name, value);
	};

	const deleteStorage = (name: string): void => {
		localStorage.removeItem(name);
	};

	const clearStorage = (): void => {
		localStorage.clear();
	};

	const checkStorage = (store: string, state: string): {} | boolean => {
		const storage = getStorage(store);

		if (storage) {
			const data = JSON.parse(storage);

			if (data[state]) {
				return data[state];
			}
		}

		return false;
	};

	return {
		checkStorage,
		clearStorage,
		deleteCookie,
		deleteStorage,
		getCookie,
		getStorage,
		setCookie,
		setStorage,
	};
}
