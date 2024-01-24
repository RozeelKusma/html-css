import { InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { persistCache, SessionStorageWrapper } from 'apollo3-cache-persist';

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				// portingSupportData: relayStylePagination(),
				// enterpriseSupportData: relayStylePagination(),
				// allUsers: relayStylePagination(),
				// getAllWorkspaces: relayStylePagination(),
				// workspaceReviews: relayStylePagination(),
				// allEmailOtp: relayStylePagination(),
				// creditLogs: relayStylePagination(),
				// activityLogs: relayStylePagination(),
			},
		},
	},
});

persistCache({
	cache,
	storage: new SessionStorageWrapper(window.sessionStorage),
	trigger: 'write',
	debug: false,
});

export default cache;
