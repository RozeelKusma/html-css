import { css } from 'styled-components';

export const antSelect = css`
	.ant-select {
		&.ant-select-single,
		&.ant-select-multiple {
			&:not(.ant-select-customize-input) .ant-select-selector {
				border-radius: 10px;
			}
		}
	}
`;
