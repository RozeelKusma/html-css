import { createGlobalStyle } from 'styled-components';
import { antButton, antInput, antSelect } from './antd';

const GlobalStyle = createGlobalStyle`
    ${antButton}
    ${antInput}
    ${antSelect}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	h1,h2,h3,h4,h5,h6 {
		margin:0;
	}
	p,ul,dl,ol {
		margin: 0;
		padding: 0;
	}
`;

export default GlobalStyle;
