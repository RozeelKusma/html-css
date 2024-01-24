/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, memo } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useRouteChecker } from '~/hooks';
import { useAuthContext } from '~/context/AuthContext';

function IndexLayout({ children }: any) {
	const { pathname } = useLocation();
	const stateContext = useAuthContext();

	let landingPath = '';

	useEffect(() => {
		landingPath = pathname;
	}, []);

	const { isAuthPage } = useRouteChecker({
		pathname,
	});

	const BootstrappedLayout = () => {
		const isUserAuthorized = !stateContext?.state?.authUser?.access;
		const redirectToLogin = !isAuthPage && !isUserAuthorized;
		// redirect to login page if current is not login page and user not authorized
		if (redirectToLogin) {
			return <Navigate to='auth/login' state={{ from: pathname }} replace />;
		}
		// redirect to main dashboard when user on login page and authorized
		if (isAuthPage && isUserAuthorized) {
			const redirectPath = landingPath;

			// landingPath = '';
			return <Navigate to={redirectPath} state={{ from: pathname }} replace />;
		}
		// in other case render previously set layout

		return children;
	};

	return BootstrappedLayout();
}

export default memo(IndexLayout);
