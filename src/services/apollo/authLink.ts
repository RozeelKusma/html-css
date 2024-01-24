import { ApolloLink } from '@apollo/client';
import SecureLS from 'secure-ls';

// import { authTokenNeeded, refreshTokenNeeded, tokenNotNeeded } from './constants';

const ls = new SecureLS({ encodingType: 'aes', isCompression: false });
export type Headers = {
	authorization?: string;
	lang?: string;
};

const authLink = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	const token = localStorage.getItem('accessToken');
	const secretId = localStorage.getItem('secretId') ?? '';
	operation.setContext(({ headers }: any) => ({
		headers: {
			...headers,
			...(token && { authorization: `Bearer ${token}` }),
			...(secretId && { 'x-workspace-secret-id': `${secretId}` }),
		},
	}));
	return forward(operation);
});
export default authLink;
