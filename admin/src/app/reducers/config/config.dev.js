export default {
	host: 'http://localhost:9090/',
	api: 'http://localhost:5000/',
	websocket: 'ws://localhost:5000',
	fbAppID: '',
	cookieID: 'reon-react-boilerplate-admin',

	// TODO :: add GET so we don't have to do "setFeatureFlags" etc...
	endpoints: {
		auth: {
			validateCookie: '//localhost:5000/api/auth/validate-token',
			login: '//localhost:5000/api/admin/auth/login',
			getUser: '//localhost:5000/api/auth/get-user',
		},
		app: {
			featureFlags: '//localhost:5000/api/app/get-feature-flags',
		},
		settings: {
			featureFlags: '//localhost:5000/api/admin/settings/get-feature-flags',
			setFeatureFlags: '//localhost:5000/api/admin/settings/set-feature-flags',
		},
		userProfiles: {
			getAllProfiles: '//localhost:5000/api/admin/users/all',
		},
	},
};
