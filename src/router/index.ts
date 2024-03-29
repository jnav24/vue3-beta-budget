import { defineComponent, onBeforeMount } from 'vue';
import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouteLocationNormalized,
	NavigationGuardNext,
	useRouter,
} from 'vue-router';
import { useUserStore } from '@/store';
import useRouteMiddleware from '@/hooks/useRouteMiddleware';
import useHttp from '@/hooks/useHttp';
import useStates from '@/hooks/useStates';

const { auth, autoLogin, runMiddleware } = useRouteMiddleware();

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: {
			name: 'login',
		},
	},
	{
		path: '/login',
		name: 'onboard',
		component: () => import('@/views/onboard/Onboard.vue'),
		children: [
			{
				path: '',
				name: 'login',
				component: () => import('@/views/onboard/Login.vue'),
				meta: {
					middleware: [autoLogin],
				},
			},
			{
				path: 'forgot-password',
				name: 'forgot-password',
				component: () => import('@/views/onboard/ForgotPassword.vue'),
			},
			{
				path: '/account-reset/:token',
				name: 'account-reset',
				component: () => import('@/views/onboard/AccountReset.vue'),
				beforeEnter: (
					to: RouteLocationNormalized,
					from: RouteLocationNormalized,
					next: NavigationGuardNext
				) => {
					next();
				},
			},
			{
				path: '/verify/:token',
				name: 'verify',
				component: () => import('@/views/onboard/Verify.vue'),
				beforeEnter: async (
					to: RouteLocationNormalized,
					from: RouteLocationNormalized,
					next: NavigationGuardNext
				) => {
					const userStore = useUserStore();
					const { get } = useHttp();
					const response = await userStore.isLoggedIn();

					if (response.error !== process.env.VUE_APP_VERIFY) {
						next('/login');
					}

					const data = {
						path: `auth/verify/${userStore.user.user_id}/${to.params.token}`,
					};
					const tokenResponse = await get(data);

					if (!tokenResponse.success) {
						next('/login');
					}

					userStore.setVerifyExpiration(
						tokenResponse.data.data.expires_at
					);
					next();
				},
			},
		],
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('@/views/dashboard/Dashboard.vue'),
		meta: {
			middleware: [auth],
		},
		beforeEnter: (
			to: RouteLocationNormalized,
			from: RouteLocationNormalized,
			next: NavigationGuardNext
		) => {
			const { init } = useStates();
			init();
			next();
		},
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('@/views/dashboard/Home.vue'),
			},
			{
				path: 'budgets',
				name: 'budgets',
				component: () => import('@/views/dashboard/Budget.vue'),
			},
			{
				path: 'budgets/:id',
				name: 'budget-edit',
				component: () => import('@/views/dashboard/BudgetEdit.vue'),
			},
			{
				path: 'budgets/template',
				name: 'budget-template',
				component: () => import('@/views/dashboard/BudgetTemplate.vue'),
			},
			{
				path: 'reports',
				name: 'reports',
				component: () => import('@/views/dashboard/Report.vue'),
			},
			{
				path: 'settings',
				name: 'settings',
				component: () => import('@/views/dashboard/Settings.vue'),
			},
			{
				path: 'logout',
				name: 'logout',
				component: () =>
					defineComponent({
						setup() {
							const { push } = useRouter();
							const { logout } = useStates();

							onBeforeMount(() => {
								logout();
								push({ name: 'login' });
							});
						},
					}),
			},
			{
				// @todo create a dashboard 404 page
				path: '/:catchAll(.*)',
				name: 'dashboard-404',
				redirect: '/dashboard',
			},
		],
	},
	{
		// @todo add guard to see if the user is signed in
		path: '/:catchAll(.*)',
		name: '404',
		redirect: '/',
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(
	(
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		runMiddleware({ next, to, from });
	}
);

export default router;
