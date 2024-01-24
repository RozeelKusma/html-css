import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from '~/components/error-boundary';
import { ErrorFallback } from '~/pages/ErrorFallback';

function AppLayout() {
	return (
		<div className='min-h-screen flex w-full'>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onError={() => 'ss'}
				onReset={() => window.location.replace(window.location.href)}
			>
				<Outlet />
			</ErrorBoundary>
		</div>
	);
}

export default memo(AppLayout);
