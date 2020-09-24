import { createStore } from "pinia";

type UserState = {
	login: any;
	user: any;
	vehicles: any[];
};

export const useUserStore = createStore({
	id: 'user',
	state: (): UserState => ({
		login: '',
		user: 'Test',
		vehicles: [],
	}),
	actions: {
		change() {
			this.user = 'Bob';
		},
	},
});
