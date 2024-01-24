import { gql } from '@apollo/client';

export const CREATE_WORKSPACE = gql`
	mutation CreateWorkspace($input: InputWorkspace!) {
		createWorkspace(input: $input) {
			data {
				id
				label
				owner_id
				slug
			}
			message
		}
	}
`;
