import styled from 'styled-components';

const Wrapper = styled.h1`
	font-weight: 500;
	font-size: 1.25rem;
	line-height: 2.5rem;
	color: var(--text-title);
`;

interface IPageHeaderProps {
	title: string;
	className?: string;
}

const PageHeader = ({ title, className }: IPageHeaderProps) => {
	return <Wrapper className={className}>{title}</Wrapper>;
};

export default PageHeader;
