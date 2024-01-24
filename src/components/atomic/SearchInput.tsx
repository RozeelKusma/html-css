import { FiSearch } from 'react-icons/fi';
import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const StyledInput = styled(Input)`
	&.ant-input-affix-wrapper {
		font-weight: 500;
		input.ant-input::placeholder {
			text-align: center;
			font-weight: 500;
			color: var(--text-placeholder);
		}
	}
`;
interface ISearchInputProps {
	size?: 'large' | 'small';
	placeholder?: string;
	className?: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({
	size = 'large',
	placeholder = 'Search',
	className,
}) => (
	<StyledInput
		className={className}
		size={size}
		placeholder={placeholder}
		prefix={<FiSearch />}
	/>
);

export default SearchInput;
