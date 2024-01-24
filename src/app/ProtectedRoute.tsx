import { Route } from 'react-router-dom';

const ProtectedRoute = ({ roleList, ...routeProps }: any) => {
	console.info('r', roleList);
	//   if (roleList?.indexOf?.(getRoleId(ROLE)) < 0) {
	//     switch (getRoleId(ROLE)) {
	//       case roles.OWNER:
	//       case roles.ADMIN:
	//       case roles.MEMBER:
	//         return <Redirect to={path.DASHBOARD} />;
	//       case roles.SUPPORT:
	//         return <Redirect to={path.PURCHASE} />;
	//       default:
	//         return <Route {...routeProps} />;
	//     }
	//   }

	// if (loading) {
	// 	return <p className='container'>Checking auth..</p>;
	// }

	// const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

	// if (!isAuthenticated) {
	// 	return <Navigate to='/login' state={{ from: location }} />;
	// }

	// if (isAuthenticated && !userHasRequiredRole) {
	// 	return <AccessDenied />; // build your won access denied page (sth like 404)
	// }

	return <Route {...routeProps} />;
};

export default ProtectedRoute;
