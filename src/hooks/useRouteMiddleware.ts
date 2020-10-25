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
			const userStore = useUserStore();
			const response: HttpResponse = await userStore.isLoggedIn();

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

	const autoLogin = async (context: {
		to: RouteLocationNormalized;
		next: NavigationGuardNext;
		from: RouteLocationNormalized;
	}) => {
		try {
			const userStore = useUserStore();
			const response: HttpResponse = await userStore.isLoggedIn();

			if (response.success) {
				context.next({ name: 'home' });
			}

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
