import getEnvironment from '../helpers/getEnvironment';
import devConfig from './config/config.dev';

const getConfig = () => {
	const environment = getEnvironment();

	if (environment === 'dev')
		return devConfig;
};

export default {
	app: {
		booted: false,
		isLoggedIn: false,
		token: null,
		showHamburgerMenu: false,
		mainNav: [],
	},

	modal: {
		visible: false,
		windows: [],
	},

	auth: {
		popup: null,
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
	}
};