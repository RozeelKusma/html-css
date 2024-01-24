import { onError } from '@apollo/client/link/error';
import SecureLS from 'secure-ls';
import { useMessageContext } from '~/context/MessageContext';
const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

const operationsToSkipLog = [
	'login',
	'register',
	'changePassword',
	'forgotPassword',
	'resetPassword',
	'signup',
];
export const handleLogoutWithoutHook = () => {
	// Logout without hook

	ls.clear();
	sessionStorage.clear();

	// do other stuff required when logout
	// eslint-disable-next-line no-restricted-globals
	location.reload();
	// location.reload() after token removed affects user redirect
};

export default function useErrorLink() {
	const messageApi: any = useMessageContext();
	const errorLink = onError(({ graphQLErrors, networkError, operation, forward }: any) => {
		if (graphQLErrors) {
			console.error('graphqlErrors', JSON.stringify(graphQLErrors));
			if (graphQLErrors) {
				const skipLog = operationsToSkipLog.includes(operation?.operationName);
				const errorPayload = {
					graphQLError: graphQLErrors,
					operationName: operation?.operationName,
					variables: skipLog ? {} : operation?.variables,
				};
			}
			if (graphQLErrors?.length > 0 && graphQLErrors[0]?.extensions?.code === 'Expired') {
				handleLogoutWithoutHook();
			} else if (graphQLErrors?.length > 0 && graphQLErrors[0]?.message === 'Auth Failed') {
				console.error('Auth Failed');
				messageApi.open({
					type: 'error',
					content: 'Session Expired! Please login.',
				});
				setTimeout(() => {
					handleLogoutWithoutHook();
				}, 1000);
			}
		}
		if (networkError) {
			const { status, error } = networkError?.result || {};

			if (status === 401 && error?.error_key === 'token_expired') {
				handleLogoutWithoutHook();
			}
			console.error('[Network Error Result]', networkError.result);
		}
		return forward(operation);
	});

	return {
		errorLink,
	};
}
