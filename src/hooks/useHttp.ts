import { reactive, ref, toRefs } from 'vue';
import axios, { AxiosResponse } from 'axios';
import useEncrypt from '@/hooks/useEncrypt';
import useSession from '@/hooks/useSession';
import { useUserStore } from '@/store';

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
	data: any;
	error: string;
	success: boolean;
};

export default function useHttp() {
	const { decryptCookie } = useEncrypt();
	const { getCookie } = useSession();
	const userStore = useUserStore();

	const state: HttpResponse = reactive({
		data: {},
		error: '',
		success: true,
	});
	const loading = ref(false);

	const getResponse = async ({
		method,
		path,
		params,
		headers,
	}: URLInterface) => {
		try {
			loading.value = true;
			let responseData: any = {
				data: params,
			};

			if (method === 'get') {
				responseData = { params };
			}

			const response: AxiosResponse = await axios({
				method,
				url: `${process.env.VUE_APP_API_DOMAIN}${path.replace(
					/^\/|\/$/g,
					''
				)}`,
				{ ...headers, 'Access-Control-Allow-Origin': '*', },
				...responseData,
				withCredentials: true,
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

			if (error?.response?.data?.message) {
				msg = error.response.data.message;

				if (msg.includes('Unauthorized')) {
					userStore.setTokenExpired(true);
				}
			}

			state.success = false;
			state.error = msg;
		} finally {
			loading.value = false;
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
				Authorization: `Bearer ${decryptCookie(
					getCookie(process.env.VUE_APP_TOKEN) ?? ''
				)}`,
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
				Authorization: `Bearer ${decryptCookie(
					getCookie(process.env.VUE_APP_TOKEN) ?? ''
				)}`,
			},
		});
	};

	const deleteAuth = async ({ path, params }: URLInterface) => {
		return getResponse({
			method: URLMethods.DELETE,
			path,
			params: params || {},
			headers: {
				Authorization: `Bearer ${decryptCookie(
					getCookie(process.env.VUE_APP_TOKEN) ?? ''
				)}`,
			},
		});
	};

	const failedResponse = (
		error = 'Something unexpected has occurred.',
		data = {}
	): HttpResponse => ({
		data,
		error,
		success: false,
	});

	const getDataFromResponse = (response: HttpResponse) => {
		const data = response.data.data;
		return data[Object.keys(data)[0]];
	};

	return {
		...toRefs(state),
		deleteAuth,
		get,
		getAuth,
		getDataFromResponse,
		loading,
		post,
		postAuth,
		failedResponse,
	};
}
