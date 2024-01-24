const config = {
	NODE_ENV: import.meta.env.NODE_ENV,
	APP_ENV: import.meta.env.VAROSA_APP_ENV,
	BASE_URI: `${import.meta.env.VAROSA_API_URI}`,
};
export default config;
