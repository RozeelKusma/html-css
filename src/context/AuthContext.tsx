import { createContext, ReactNode, useReducer, useContext } from 'react';

type State = {
	authUser: any | null;
};

type Action = {
	type: string;
	payload: any | null;
};

type Dispatch = (action: Action) => void;

const getAuthUser = () => {
	let users = null;
	try {
		users = JSON.parse(localStorage.getItem('_users') ?? '');
	} catch (error: any) {
		users = null;
	}
	return users;
};

const initialState: State = {
	authUser: getAuthUser(),
};

type AuthContextProviderProps = { children: ReactNode };

const AuthContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const stateReducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'SET_USER': {
			return {
				...state,
				authUser: action.payload,
			};
		}
		default: {
			throw new Error(`Unhandled action type`);
		}
	}
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [state, dispatch] = useReducer(stateReducer, initialState);
	const value = { state, dispatch };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (context) {
		return context;
	}

	throw new Error(`useAuthContext must be used within a AuthContextProvider`);
};

export { AuthContextProvider, useAuthContext };
