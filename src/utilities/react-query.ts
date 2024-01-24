import { AxiosError, AxiosResponse } from 'axios';

import { request } from '~/api';
import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
	UseQueryOptions,
	QueryFunctionContext,
} from '@tanstack/react-query';
import { GetInfinitePagesInterface } from '~/interfaces';

type ObjectT = Record<string, unknown>;

type QueryKeyT = [string, ObjectT | undefined];

export const fetcher = async <T>({
	queryKey,
	pageParam,
}: Pick<QueryFunctionContext<QueryKeyT>, 'queryKey' | 'pageParam'>): Promise<T> => {
	const [url, params] = queryKey;
	const response = await request.get<T>(url, { params: { ...params, pageParam } });
	return response.data;
};

export const useLoadMore = <T>(url: string | null, params?: ObjectT) => {
	const context = useInfiniteQuery<
		GetInfinitePagesInterface<T>,
		Error,
		GetInfinitePagesInterface<T>,
		QueryKeyT
	>([url!, params], ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam }), {
		getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
		getNextPageParam: (lastPage) => {
			return lastPage.nextId ?? false;
		},
	});

	return context;
};

export const usePrefetch = <T>(url: string | null, params?: ObjectT) => {
	const queryClient = useQueryClient();

	return () => {
		if (!url) {
			return;
		}

		queryClient.prefetchQuery<T, Error, T, QueryKeyT>([url!, params], ({ queryKey }) =>
			fetcher({ queryKey }),
		);
	};
};

export const useFetch = <T>(
	url: string | null,
	params?: ObjectT,
	config?: UseQueryOptions<T, Error, T, QueryKeyT>,
) => {
	const context = useQuery<T, Error, T, QueryKeyT>(
		[url!, params],
		({ queryKey }) => fetcher({ queryKey }),
		{
			enabled: !!url,
			...config,
		},
	);

	return context;
};

const useGenericMutation = <T, S>(
	func: (data: T | S) => Promise<AxiosResponse<S>>,
	url: string,
	params?: ObjectT,
	updater?: ((oldData: T, newData: S) => T) | undefined,
) => {
	const queryClient = useQueryClient();

	return useMutation<AxiosResponse, AxiosError, T | S>(func, {
		onMutate: async (data) => {
			await queryClient.cancelQueries([url!, params]);

			const previousData = queryClient.getQueryData([url!, params]);

			queryClient.setQueryData<T>([url!, params], (oldData) => {
				return updater ? updater(oldData!, data as S) : (data as T);
			});

			return previousData;
		},
		onError: (err, _, context) => {
			queryClient.setQueryData([url!, params], context);
		},
		onSettled: () => {
			queryClient.invalidateQueries([url!, params]);
		},
	});
};

export const useDelete = <T>(
	url: string,
	params?: ObjectT,
	updater?: (oldData: T, id: string | number) => T,
) => {
	return useGenericMutation<T, string | number>(
		(id) => request.delete(`${url}/${id}`),
		url,
		params,
		updater,
	);
};

export const usePost = <T, S>(
	url: string,
	params?: ObjectT,
	updater?: (oldData: T, newData: S) => T,
) => {
	return useGenericMutation<T, S>((data) => request.post<S>(url, data), url, params, updater);
};

export const useUpdate = <T, S>(
	url: string,
	params?: ObjectT,
	updater?: (oldData: T, newData: S) => T,
) => {
	return useGenericMutation<T, S>((data) => request.patch<S>(url, data), url, params, updater);
};
