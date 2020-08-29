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
