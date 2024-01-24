import { useFetch, usePost } from '~/utilities/react-query';

import { pathToUrl } from '~/utilities/router';

import request from './request';
import { apiRoutes } from './constant';

export const getTokenByPassword = (email: string, password: string) =>
	request.post<{ token: string }>(apiRoutes.getTokenByPassword, {
		email,
		password,
	});

export const useGetProfile = () => {
	const context = useFetch<{ user: any }>(apiRoutes.getProfile, undefined, {
		retry: false,
	});
	return { ...context, data: context.data?.user };
};

export const useGetUsers = () => {
	const context = useFetch<{ user: any }>(apiRoutes.users, undefined, {
		onSuccess: (args: any) => console.log('success', args),
	});
	return { ...context, data: context.data };
};

export const useGetUsersList = () => useFetch<any[]>(pathToUrl(apiRoutes.users));
export const useGetUser = (id: number | null) =>
	useFetch<any>(id ? pathToUrl(apiRoutes.users, { id }) : null);

export const useAddUser = (updater: (oldData: any[], newData: any) => any[]) =>
	usePost<any[], any>(pathToUrl(apiRoutes.users), undefined, updater);
