import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { Loadable } from '~/components';
import { PublicLayout, AppLayout } from '~/components/layouts';

import { LOGIN, REGISTER, FORGET_PASSWORD, RESET_PASSWORD, APP, DASHBOARD, AUTH } from './path';

const Dashboard = Loadable(lazy(() => import('~/pages/dashboard')));
const NotFound = Loadable(lazy(() => import('~/pages/NotFound')));

const authRoutes: RouteObject = {
	path: AUTH,
	element: <PublicLayout />,
	children: [
		{ index: true, element: <div>login page</div> },
		{ path: LOGIN, element: <div>login page</div> },
		{ path: REGISTER, element: <div>login page</div> },
		{ path: FORGET_PASSWORD, element: <div>login page</div> },
		{ path: `${RESET_PASSWORD}/:UID/:token`, element: <div>login page</div> },
	],
};
const notFoundRoutes: RouteObject = {
	path: '*',
	element: <NotFound />,
};

const appRoutes: RouteObject = {
	path: APP,
	element: <AppLayout />,
	children: [
		{
			path: DASHBOARD,
			element: <Dashboard />,
		},
		notFoundRoutes,
	],
};

const routes: RouteObject[] = [
	{ path: '/', element: <Navigate to={`${APP}/${DASHBOARD}`} /> },
	authRoutes,
	appRoutes,
	notFoundRoutes,
];

export default routes;
