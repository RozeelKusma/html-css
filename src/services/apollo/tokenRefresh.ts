/* eslint-disable no-console */
/* TODO: Access token expiry case is handled in authlink instead of handling it in this file
   due to some errors encountered in handleError fn below while fetching new access token. */
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import decode, { JwtPayload } from 'jwt-decode';
import { CONFIG } from '~/config';
import SecureLS from 'secure-ls';
import { handleLogoutWithoutHook } from './errorLink';

const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

const getUser = () => {
	let parsedUser: any = {};
	try {
		const user = ls.get('user') ?? JSON.stringify('');
		parsedUser = user && JSON.parse(user);
	} catch (e) {
		console.warn(e);
	}
	return parsedUser;
};

const getAuthAccessTokens = () => {
	let parsedTokens: any = {};
	try {
		const tokens = ls.get('_tokens');
		parsedTokens = tokens && JSON.parse(tokens);
	} catch (e) {
		console.warn(e);
	}
	return parsedTokens;
};

const getTokens = () => {
	const { accessToken, refreshToken } = getUser();
	return { accessToken, refreshToken };
};

const JwtRefreshLink = new TokenRefreshLink({
	accessTokenField: `accessToken`,
	isTokenValidOrUndefined: () => {
		const { accessToken } = getTokens();
		if (!accessToken) {
			return true;
		}
		try {
			const { exp } = decode<JwtPayload>(accessToken);
			if (exp && Date.now() >= exp * 1000) {
				return false;
			}
			return true;
		} catch {
			return false;
		}
	},
	fetchAccessToken: () => {
		const tokens = getTokens() || {};
		return fetch(`${CONFIG.BASE_URI}`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				authorization: `JWT ${tokens.refreshToken}`,
			},
			body: JSON.stringify({
				query: '',
				variables: {},
			}),
		}).then((response) => response.json());
	},
	handleResponse: () => (res: any) => {
		const data = {
			accessToken: res?.data?.refreshToken?.data?.accessToken,
		};
		return { data };
	},
	handleFetch: (accessToken: string) => {
		const user = getUser();
		const tokens = getAuthAccessTokens();

		const updatedUser = { ...user, accessToken };
		const updatedTokens = {
			...tokens,
			accessToken,
		};

		ls.set('user', JSON.stringify(updatedUser));
		ls.set('_tokens', JSON.stringify(updatedTokens));
	},
	handleError: (err) => {
		console.error(err);
		const deviceId = localStorage.getItem('deviceId');
		handleLogoutWithoutHook();
		localStorage.setItem('deviceId', deviceId as string);
	},
});

export default JwtRefreshLink;
