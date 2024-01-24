import { message } from 'antd';
import { createContext, useContext } from 'react';

export const MessageContext = createContext({});

const MessageContextProvider = ({ children }: any) => {
	const [messageApi, contextHolder] = message.useMessage();
	return (
		<MessageContext.Provider value={messageApi}>
			{contextHolder}
			{children}
		</MessageContext.Provider>
	);
};
const useMessageContext = () => {
	const context = useContext(MessageContext);

	if (context) {
		return context;
	}

	throw new Error(`useMessageContext must be used within a MessageContextProvider`);
};

export { MessageContextProvider, useMessageContext };
