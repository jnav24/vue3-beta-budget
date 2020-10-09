import { createStore } from 'pinia';
import useHttp, { HttpResponse } from '@/hooks/useHttp';

type UserState = {
	login: any;
	user: any;
	vehicles: any[];
};

export const useUserStore = createStore({
	id: 'user',
	state: (): UserState => ({
		login: '',
		user: '',
		vehicles: [],
	}),
	actions: {
		resetUser() {
			this.login = '';
			this.user = '';
			this.vehicles = [];
		},

		// async isLoggedIn() {},

		async logUserIn(params: { username: string; password: string }) {
			const { post } = useHttp();
			const response: HttpResponse = await post({
				path: 'auth/login',
				params,
			});

			if (response.success) {
				// ...
			}

			return response;
		},
	},
});
