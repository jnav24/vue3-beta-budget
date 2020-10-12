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
		id: number;
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

					this.user = { ...user };
					this.vehicles = [...vehicles];

					if (verify.token) {
						return failedResponse(
							process.env.VUE_APP_VERIFY,
							verify
						);
					}
				}

				return response;
			}

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
			const { deleteCookie } = useSession();
			deleteCookie(cookieName);
			this.resetUser();
			// @todo add reset to other stores
		},

		setVerifyExpiration(payload: string) {
			this.login = {
				...this.login,
				verify: {
					expires_at: payload,
				},
			};
		},

		getVehicleName(id: number) {
			return this.vehicles.find(obj => obj.id === id);
		},
	},
});
