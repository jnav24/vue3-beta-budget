import { createStore } from 'pinia';
import useHttp, { HttpResponse } from '@/hooks/useHttp';
import useSession from '@/hooks/useSession';

type LoginType = {
	timeout: boolean;
	throttle: {
		attempts: number;
		allowed: number;
	};
	verify: {
		expires_at: string;
	};
};

type UserState = {
	login: LoginType;
	user: {
		first_name?: string;
		last_name?: string;
		id?: string;
		user_id?: string;
		email?: string;
		token?: string;
	};
	vehicles: Array<{
		id: string;
		make: string;
		model: string;
		year: string;
		color: string;
		license?: string;
		active: number;
	}>;
};

const cookieName = process.env.VUE_APP_TOKEN;

export const useUserStore = createStore({
	id: 'user',
	state: (): UserState => ({
		login: {} as LoginType,
		user: {},
		vehicles: [],
	}),
	actions: {
		resetUser() {
			this.login = {} as LoginType;
			this.user = {};
			this.vehicles = [];
		},

		async isLoggedIn() {
			const { getAuth, failedResponse } = useHttp();
			const { getCookie } = useSession();
			const cookie = getCookie(cookieName);

			if (cookie) {
				const response = await getAuth({ path: 'auth/user' });

				if (response.success) {
					const { user, vehicles, verify } = response.data.data;

					if (verify.token) {
						// fail and redirect to verify screen
					}

					this.user = { ...user };
					this.vehicles = [...vehicles];
				}

				return response;
			}

			// logout
			this.logout();
			return failedResponse();
		},

		async logUserIn(params: { username: string; password: string }) {
			const { post } = useHttp();
			const { setCookie } = useSession();

			const response: HttpResponse = await post({
				path: 'auth/login',
				params,
			});

			if (response.success) {
				setCookie(cookieName, response.data.data.token);
			}

			return response;
		},

		logout() {
			console.log('logging out');
		},
	},
});
