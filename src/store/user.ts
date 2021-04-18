import { createStore } from 'pinia';
import useHttp, { HttpResponse } from '@/hooks/useHttp';
import useSession from '@/hooks/useSession';
import useStates from '@/hooks/useStates';

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
		mfa_enabled: boolean;
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
		login: {
			timeout: false,
			throttle: {
				attempts: 0,
				allowed: 0,
			},
			verify: {
				expires_at: '',
			},
		},
		user: {
			mfa_enabled: false,
		},
		vehicles: [],
	}),

	getters: {
		vehicleList() {
			return this.vehicles.map(vehicle => {
				return {
					active: vehicle.active,
					label: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
					value: vehicle.id,
				};
			});
		},
	},

	actions: {
		async getToken() {
			const { get } = useHttp();
			const { setCookie } = useSession();
			const resp = await get({ path: 'user/token' });
			const { token, exp } = resp.data.data;
			// @todo not sure if I need this yet
			// this.setTokenExpired(false);
			setCookie(cookieName, token, exp);
		},

		setTokenExpired(payload: boolean) {
			this.login.timeout = payload;
		},

		async isLoggedIn() {
			const { getAuth, failedResponse } = useHttp();
			const { getCookie } = useSession();
			const { logout } = useStates();
			const cookie = getCookie(cookieName);

			if (cookie) {
				const response = await getAuth({ path: 'api/user-profile' });

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

			logout();
			return failedResponse();
		},

		async logUserIn(params: { username: string; password: string }) {
			const { get, post } = useHttp();

			await get({ path: 'sanctum/csrf-cookie' });

			const response: HttpResponse = await post({
				path: 'login',
				params: { ...params, email: params.username },
			});

			if (response.success && !response.data.two_factor) {
				this.getToken();
			}

			return response;
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

		setMfa(value: boolean) {
			this.user.mfa_enabled = value;
		},

		async updateProfile({
			first_name,
			last_name,
			email,
		}: {
			first_name: string;
			last_name: string;
			email: string;
		}) {
			const { putAuth } = useHttp();
			const response = await putAuth({
				path: 'user/profile-information',
				params: {
					email,
					first_name,
					last_name,
				},
			});

			if (response.success) {
				this.user.email = email;
				this.user.first_name = first_name;
				this.user.last_name = last_name;
			}

			return {
				success: response.success ?? false,
			};
		},
	},
});
