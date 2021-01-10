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
		user: {},
		vehicles: [],
	}),

	getters: {
		vehicleList() {
			return this.vehicles.map(vehicle => {
				return {
					active: vehicle.active,
					label: `${vehicle.make} ${vehicle.model}`,
					value: vehicle.id,
				};
			});
		},
	},

	actions: {
		setTokenExpired(payload: boolean) {
			this.login.timeout = payload;
		},

		async isLoggedIn() {
			const { getAuth, failedResponse } = useHttp();
			const { getCookie } = useSession();
			const { logout } = useStates();
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

			logout();
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
				this.setTokenExpired(false);
				setCookie(cookieName, response.data.data.token);
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
	},
});
