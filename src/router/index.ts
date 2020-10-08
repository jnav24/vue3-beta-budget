import {
	createRouter,
	createWebHistory,
	RouteRecordRaw,
	RouteLocationNormalized,
	NavigationGuardNext,
} from 'vue-router';
import { useBudgetStore, useTemplateStore, useTypesStore } from '@/store';

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
			},
			{
				path: '/forgot-password',
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
		],
	},
	{
		path: '/dashboard',
		name: 'dashbaord',
		component: () => import('@/views/dashboard/Dashboard.vue'),
		beforeEnter: (
			to: RouteLocationNormalized,
			from: RouteLocationNormalized,
			next: NavigationGuardNext
		) => {
			const budgetStore = useBudgetStore();
			const templateStore = useTemplateStore();
			const typesStore = useTypesStore();
			budgetStore.getBudgets();
			templateStore.getTemplates();
			typesStore.getAllBillTypes();
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

export default router;
