import CryptoJS from 'crypto-js';

const secret = process.env.VUE_APP_SECRET_KEY;

export default function useEncrypt() {
	const decryptCookie = (encryptedValue: string) => {
		const bytes = CryptoJS.AES.decrypt(encryptedValue, secret);
		return bytes.toString(CryptoJS.enc.Utf8);
	};

	const encryptCookie = (value: string) =>
		CryptoJS.AES.encrypt(value, secret);

	return {
		decryptCookie,
		encryptCookie,
	};
}
