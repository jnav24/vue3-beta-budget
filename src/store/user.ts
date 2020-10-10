import { createStore } from 'pinia';
import useHttp, { HttpResponse } from '@/hooks/useHttp';
import useSession from '@/hooks/useSession';

type UserState = {
	login: any;
	user: any;
	vehicles: any[];
};

const cookieName = process.env.VUE_APP_TOKEN;

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
			const { setCookie } = useSession();

			const response: HttpResponse = await post({
				path: 'auth/login',
				params,
			});

			if (response.success) {
				setCookie(cookieName, response.data.token);
			}

			return response;
		},
	},
});
