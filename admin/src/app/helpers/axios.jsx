import mainStore from '../store/store';

export const test = (test) => {
	return 'hello kitty'
};

export const axiosOptions = (headers) => {

	console.log('111', mainStore)
	const token = mainStore.getState().app.token;

	let options = {
		headers: {
			Accept: 'application/json',
			ContentType: 'application/x-www-form-urlencoded',
			'Access-Control-Allow-Headers': 'x-access-token',
			...headers,
		},
	};

	if (token) {
		options.headers = {
			...options.headers,
			'x-auth-token': token,
		};
	}

	return options;
};

export const axiosCall = async ({
	type = 'post',
	endpoint = null,
}) => {
	if (!endpoint)
		return;

	return await axios[type](endpoint, axiosOptions());
};