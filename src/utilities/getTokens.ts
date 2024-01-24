export const getTokens = () => {
	let users = null;
	try {
		users = JSON.parse(localStorage.getItem('_users') ?? '');
	} catch (error: any) {
		users = null;
	}
	return users;
};
