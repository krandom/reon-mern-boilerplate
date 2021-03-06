export default {
	host: 'http://localhost:8080/',
	api: 'http://localhost:5000/',
	websocket: 'ws://localhost:5000',
	fbAppID: '',

	// TODO :: add GET so we don't have to do "setFeatureFlags" etc...
	endpoints: {
		exchangeRatesApi: {
			latest: 'https://api.exchangeratesapi.io/latest?base=USD',
		},
		coinMarketCap: {
			login: '//reonsolutions.com/mock-server/login.php',
			logout: '//reonsolutions.com/mock-server/logout.php',
		},
		user: {
			getProfile: '//reonsolutions.com/mock-server/getProfile.php',
		},
		app: {
			boot: '//localhost:5000/api/boot/client/init',
			featureFlags: '//localhost:5000/api/app/get-feature-flags',
			metaData: '//localhost:5000/api/app/meta-data',
		},
		auth: {
			// validateCookie: '//localhost:5000/api/auth/validate-token',
			verifyEmail: '//localhost:5000/api/auth/verify-email',
			signup: '//localhost:5000/api/auth/signup',
			login: '//localhost:5000/api/auth/login',
			logout: '//localhost:5000/api/auth/logout',
			getUser: '//localhost:5000/api/auth/get-user',
			requestPwdResetLink: '//localhost:5000/api/auth/request-pwd-reset-password',
			resetPassword: '//localhost:5000/api/auth/reset-password',
		},
	},
};
