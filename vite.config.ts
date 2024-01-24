// @ts-nocheck
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import { antdTheme } from './src/styles/antdTheme';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			// Removes React Devtools in production build
			removeDevtoolsInProd: true,

			// Exclude storybook stories
			exclude: /\.stories\.(t|j)sx?$/,
		}),
		svgr(),
		vitePluginImp({
			libList: [
				{
					libName: 'antd',
					style: (name) => {
						if (name === 'col' || name === 'row') {
							return 'antd/lib/style/index.less';
						}
						return `antd/es/${name}/style/index.less`;
					},
				},
			],
		}),
	],
	css: {
		preprocessorOptions: {
			less: {
				modifyVars: antdTheme,
				javascriptEnabled: true,
			},
		},
	},

	resolve: {
		alias: [{ find: '~', replacement: resolve(__dirname, 'src') }],
	},
	envPrefix: 'VAROSA_',
	test: {
		globals: true,

		environment: 'jsdom',

		setupFiles: './setupTests.cjs',
	},
});
