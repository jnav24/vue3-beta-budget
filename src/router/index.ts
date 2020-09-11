import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

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
		],
	},
	{
		path: '/dashboard',
		name: 'dashbaord',
		component: () => import('@/views/dashboard/Dashboard.vue'),
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('@/views/dashboard/Home.vue'),
			},
			{
				path: '',
				name: 'budgets',
				component: () => import('@/views/dashboard/Budget.vue'),
			},
			{
				path: '',
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
