import { memo } from 'react';
import { Outlet } from 'react-router-dom';

function PublicLayout() {
	return (
		<div className='flex h-screen w-screen items-center justify-center'>
			<Outlet />
		</div>
	);
}

export default memo(PublicLayout);
