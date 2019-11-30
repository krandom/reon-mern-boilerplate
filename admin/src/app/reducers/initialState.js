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
		token: null,
		toggleHamburgerMenu: false,
	},

	modal: {
		visible: false,
		windows: [],
	},

	auth: {
		user: null,
	},

	// TODO :: make endpoints for own environment in same file so you only have to specify host
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
};
