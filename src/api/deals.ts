import { useFetch } from '~/utilities/react-query';

import { pathToUrl } from '~/utilities/router';

import { apiRoutes } from './constant';

export const useGetDealList = () => {
	const response: any = useFetch<any[]>(pathToUrl(apiRoutes.deals));
	return {
		...response,
		data: response?.data?.body?.Items,
	};
};
export const useGetDeal = (dealid: string | null) => {
	const res: any = useFetch<any>(pathToUrl(apiRoutes.deals, { dealid }), { dealid });
	return {
		...res,
		data: res?.data?.body,
	};
};
