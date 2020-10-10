import { reactive, toRefs } from 'vue';
import axios, { AxiosResponse } from 'axios';
import useSession from '@/hooks/useSession';

enum URLMethods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

type URLInterface = {
	method?: URLMethods;
	path: string;
	params?: Record<string, any>;
	headers?: Record<string, any>;
};

export type HttpResponse = {
	loading: boolean;
	data: any;
	error: string;
	success: boolean;
};

export default function useHttp() {
	const { getCookie } = useSession();

	const state: HttpResponse = reactive({
		loading: false,
		data: {},
		error: '',
		success: true,
	});

	const getResponse = async ({
		method,
		path,
		params,
		headers,
	}: URLInterface) => {
		try {
			state.loading = true;
			let responseData: any = {
				data: params,
			};

			if (method === 'get') {
				responseData = { params };
			}

			const response: AxiosResponse = await axios({
				method,
				url: `${process.env.VUE_APP_API_DOMAIN}/${path}`,
				headers,
				...responseData,
			});

			if (response.status >= 200 && response.status < 300) {
				state.success = true;
				state.data = response.data;
			} else {
				state.success = false;
			}
		} catch (error) {
			let msg =
				'Something unexpected has occurred. Please try again later.';

			if (error.response.data.message) {
				msg = error.response.data.message;
			}

			state.success = false;
			state.error = msg;
		} finally {
			state.loading = false;
		}

		return state;
	};

	const get = async ({ path, params }: URLInterface) => {
		return getResponse({
			method: URLMethods.GET,
			path,
			params: params || {},
			headers: {},
		});
	};

	const getAuth = async ({ path, params }: URLInterface) => {
		return getResponse({
			method: URLMethods.GET,
			path,
			params: params || {},
			headers: {
				Authorization: `Bearer ${getCookie(process.env.VUE_APP_TOKEN)}`,
			},
		});
	};

	const post = async ({ path, params }: URLInterface) => {
		return getResponse({
			method: URLMethods.POST,
			path,
			params: params || {},
			headers: {},
		});
	};

	const postAuth = async ({ path, params }: URLInterface) => {
		return getResponse({
			method: URLMethods.POST,
			path,
			params: params || {},
			headers: {
				Authorization: `Bearer ${getCookie(process.env.VUE_APP_TOKEN)}`,
			},
		});
	};

	const failedResponse = (
		error = 'Something unexpected has occurred.'
	): HttpResponse => ({
		loading: false,
		data: {},
		error,
		success: false,
	});

	return {
		...toRefs(state),
		get,
		getAuth,
		post,
		postAuth,
		failedResponse,
	};
}
