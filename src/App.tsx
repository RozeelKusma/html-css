import AppRouter from '~/app/AppRouter';

import { AuthContextProvider } from '~/context/AuthContext';

import './i18n';
import GlobalStyle from './styles';
import { MessageContextProvider } from './context/MessageContext';

function App(): JSX.Element {
	return (
		<AuthContextProvider>
			<MessageContextProvider>
				<GlobalStyle />
				<AppRouter />
			</MessageContextProvider>
		</AuthContextProvider>
	);
}

export default App;
