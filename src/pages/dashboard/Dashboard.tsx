import React from 'react';
import { z } from 'zod';

import { Input, Button } from 'antd';

import { useRHForm, ControlledField } from '~/components/form';

import { useTypeSafeTranslation } from '~/hooks/useTypeSafeTranslation';

const Dashboard: React.FC = () => {
	const { t } = useTypeSafeTranslation();

	const schema = z.object({
		firstName: z.string().min(1, { message: 'FirstName is required' }),
	});

	const handleSubmit = (data: any) => console.log(data);

	const { Form, methods } = useRHForm({ initialValues: null, schema });

	return (
		<div>
			<h2>{t('header.dashboard')}</h2>
			<Form onSubmit={handleSubmit}>
				<ControlledField
					control={methods.control}
					name='firstName'
					Component={Input}
					errors={methods.formState.errors}
					componentProps={{ size: 'small' }}
				/>
				<Button htmlType='submit'>Submit</Button>
			</Form>
		</div>
	);
};

export default Dashboard;
