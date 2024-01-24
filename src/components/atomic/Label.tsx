import { memo } from 'react';

interface LabelProps {
	id?: string;
	children: React.ReactNode;
	required?: boolean;
}

const Label = ({ id = 'id', children, required = false }: LabelProps) => {
	return (
		<label
			htmlFor={id}
			data-test-id={`${id}-test-label`}
			className='text-sm leading-3.5 font-medium text-gray-700 inline-block'
		>
			{children}
			{required && <span className='text-error'> *</span>}
		</label>
	);
};

export default memo(Label);
