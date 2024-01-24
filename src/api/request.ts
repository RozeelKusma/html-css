import axios from 'axios';

import { CONFIG } from '~/config';

import { setupInterceptorsTo } from './interceptors';

const request = setupInterceptorsTo(
	axios.create({
		baseURL: CONFIG.BASE_URI,
		headers: {
			'Content-Type': 'application/json',
		},
		timeout: 90000,
	}),
);

export default request;
