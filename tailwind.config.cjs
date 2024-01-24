/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	important: false,
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'var(--color-primary)',
					50: '#F5F2F8',
					100: '#ECE6F2',
					200: '#D7CCE4',
					300: '#B099C9',
					400: '#8867AF',
					500: '#613494',
					550: '#301C58',
					600: '#2C0068',
					700: '#200057',
					800: '#170046',
					900: '#10003A',
				},
				gray: {
					DEFAULT: 'var(--text-primary)',
				},
			},
		},
	},
	plugins: [],
};
