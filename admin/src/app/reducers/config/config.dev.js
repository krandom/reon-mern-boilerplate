export default {
	host: 'http://localhost:8080/',
	api: 'http://localhost:8080/',
	fbAppID: '',
	cookieID: 'reon-react-boilerplate',

	endpoints: {
		auth: {
			validateCookie: '//localhost:5000/api/auth/validate-token',
			login: '//localhost:5000/api/admin/auth/login',
			getUser: '//localhost:5000/api/auth/get-user',
		},
		userProfiles: {
			getAllProfiles: '//localhost:5000/api/admin/users/all',
		},
	},
};
