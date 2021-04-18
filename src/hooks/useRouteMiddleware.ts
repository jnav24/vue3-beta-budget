import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/store';
import { HttpResponse } from '@/hooks/useHttp';

type ContextType = {
	to: RouteLocationNormalized;
	next: NavigationGuardNext;
	from: RouteLocationNormalized;
};

export default function useRouteMiddleware() {
	const auth = async (context: ContextType) => {
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

	const autoLogin = async (context: ContextType) => {
		try {
			const { isLoggedIn } = useUserStore();
			const response: HttpResponse = await isLoggedIn();

			if (response.success) {
				context.next({ name: 'home' });
			}

			context.next();
		} catch (error) {
			context.next('/login');
		}
	};

	const runMiddleware = (context: ContextType) => {
		if (context.to.meta && context.to.meta.middleware) {
			(context.to.meta.middleware as Array<{
				(context: ContextType): void;
			}>).map(mw => {
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
