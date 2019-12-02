export default {
	host: 'http://localhost:8080/',
	api: 'http://localhost:5000/',
	websocket: 'ws://localhost:5000',
	fbAppID: '',
	cookieID: 'reon-react-boilerplate',

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
		auth: {
			validateCookie: '//localhost:5000/api/auth/validate-token',
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
