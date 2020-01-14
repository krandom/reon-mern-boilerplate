import getEnvironment from '../helpers/getEnvironment';
import devConfig from './config/config.dev';

const getConfig = () => {
	const environment = getEnvironment();

	if (environment === 'dev') return devConfig;
};

export default {
	app: {
		booted: false,
		isLoggedIn: false,
		token: localStorage.getItem('token'),
		showHamburgerMenu: false,
		mainNav: [],
		featureFlags: {},
		metaData: {},
		clientEnv: getEnvironment(),
		clientApp: 'client',
	},

	modal: {
		visible: false,
		windows: [],
	},

	auth: {
		user: null,
	},

	config: getConfig(),

	user: {
		profile: null,
	},

	notification: {
		toast: [],
	},

	sidebar: {
		pages: [],
		transition: true,
	},

	sandbox: {
		exchangeRates: [],
	},

	websocket: {
		websocketID: uuid(),
		socket: null,
	},
};
