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
		token: cookies.get('reon-mern-boilerplate-admin'),
		toggleHamburgerMenu: false,
		featureFlags: {},
		constants: {},
		metaData: {},
		clientEnv: getEnvironment(),
		clientApp: 'admin',
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

	users: {

	},

	settings: {
		featureFlags: [],
		metaData: [],
		constants: {},
	},
};
