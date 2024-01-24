/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ThemeContextProviderProps = { children: ReactNode };
const defaultValue = {
	currentTheme: 'light',
	changeCurrentTheme: (newTheme: 'light' | 'dark') => {},
};

const ThemeContext = createContext(defaultValue);

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
	const persistedTheme: string | null = localStorage.getItem('theme');
	const [theme, setTheme] = useState(persistedTheme || 'light');

	const changeCurrentTheme = (newTheme: 'light' | 'dark') => {
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	useEffect(() => {
		if (theme === 'light') document.body.classList.remove('dark');
		else document.body.classList.add('dark');
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

const useThemeContext = () => {
	const context = useContext(ThemeContext);

	if (context) {
		return context;
	}

	throw new Error(`useThemeContext must be used within a AuthContextProvider`);
};

export { ThemeContextProvider, useThemeContext };
