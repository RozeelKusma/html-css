import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation CreateUser($input: InputUser!) {
		createUser(input: $input) {
			message
			data {
				email
				id
				name
				phoneNumber
				roles {
					id
					label
					level
					slug
				}
			}
		}
	}
`;
