import { gql } from '@apollo/client';

export const SIGN_UP = gql`
	mutation Mutation($input: InputAuthSignUp!) {
		signUp(input: $input) {
			message
			data {
				id
				name
				email
				phone_number
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
