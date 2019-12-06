import Cookies from 'universal-cookie';

import getEnvironment from '../helpers/getEnvironment';
import devConfig from './config/config.dev';

const getConfig = () => {
	const environment = getEnvironment();

	if (environment === 'dev') return devConfig;
};

const cookies = new Cookies();

export default {
	app: {
		booted: false,
		isLoggedIn: false,
		// TODO :: keep token name consistent to make session persist between apps
		token: cookies.get('reon-mern-boilerplate'),
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
