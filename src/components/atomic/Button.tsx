import { Button as AntButton } from 'antd';
import styled from 'styled-components';

const Button = styled(AntButton)`
	display: flex;
	column-gap: 6px;
	svg {
		display: inline-block;
	}
`;

export default Button;
