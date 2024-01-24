/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VAROSA_APP_ENV: string;
	readonly VAROSA_API_URI: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
