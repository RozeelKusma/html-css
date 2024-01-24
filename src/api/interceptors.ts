import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { CONFIG } from '~/config';
import { getTokens } from '~/utilities/getTokens';

const onRequest = (config: any): AxiosRequestConfig => {
	const token = getTokens();

	if (token?.access) {
		config.headers['Authorization'] = `Bearer ${token.access}`;
	}

	return config;
};

const onRequestError = async (error: any): Promise<AxiosError> => {
	return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	return response;
};

const onResponseError = async (error: any): Promise<any> => {
	if (error.response) {
		// Access Token was expired
		if (error.response.status === 401) {
			const storedToken = getTokens();

			try {
				const rs = await axios.post(`${CONFIG.BASE_URI}auth/refresh/`, {
					refresh: storedToken.refresh,
				});

				const { access } = rs.data;

				const updatedUsr = {
					...storedToken,
					access,
				};

				localStorage.setItem('_users', JSON.stringify(updatedUsr));

				return;
			} catch (_error) {
				return Promise.reject(_error);
			}
		}
	}
	return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
	axiosInstance.interceptors.request.use(onRequest, onRequestError);
	axiosInstance.interceptors.response.use(onResponse, onResponseError);
	return axiosInstance;
};
