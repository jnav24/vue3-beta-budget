import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/store';
import { HttpResponse } from '@/hooks/useHttp';

export default function useRouteMiddleware() {
	const auth = async (context: {
		to: RouteLocationNormalized;
		next: NavigationGuardNext;
		from: RouteLocationNormalized;
	}) => {
		try {
			const { isLoggedIn } = useUserStore();
			const response: HttpResponse = await isLoggedIn();

			if (response.success) {
				context.next();
			} else {
				if (response.error === process.env.VUE_APP_VERIFY) {
					context.next(`/verify/${response.data.token}`);
				} else {
					context.next('/login');
				}
			}
		} catch (error) {
			context.next('/login');
		}
	};

	const autoLogin = (context: {
		to: RouteLocationNormalized;
		next: NavigationGuardNext;
		from: RouteLocationNormalized;
	}) => {
		try {
			// const response: ResponseInterface = await store.dispatch('isLoggedIn');

			// if (response.success) {
			// 	context.next({ name: 'dashboard' });
			// }

			context.next();
		} catch (error) {
			context.next('/login');
		}
	};

	const runMiddleware = (context: {
		to: RouteLocationNormalized;
		next: NavigationGuardNext;
		from: RouteLocationNormalized;
	}) => {
		if (context.to.meta && context.to.meta.middleware) {
			context.to.meta.middleware.map((mw: (context: any) => void) => {
				if (typeof mw === 'function') {
					mw(context);
				}
			});
		} else {
			context.next();
		}
	};

	return { auth, autoLogin, runMiddleware };
}
