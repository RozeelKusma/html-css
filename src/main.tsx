import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import 'react-perfect-scrollbar/dist/css/styles.css';

import App from '~/App';
import { ThemeContextProvider } from '~/context/ThemeContext';

import './index.css';
import 'antd/dist/antd.less';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 1000,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeContextProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
				<Router>
					<App />
				</Router>
			</QueryClientProvider>
		</ThemeContextProvider>
	</React.StrictMode>,
);
