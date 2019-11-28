var dev = window.location.href.indexOf('localhost') !== -1 ? true : false;

export default {
  app: {
  	booted: false,
  	isLoggedIn: false,
  	token: null,
    showHamburgerMenu: false,
    mainNav: [],

  	endpoints: { // move to config and make different depending on environment
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
      	resetPassword: '//localhost:5000/api/auth/reset-password',
      }
    },
  },

  modal: {
    visible: false,
    windows: [],
  },

  auth: {
    popup: null,
    user: null,
  },

  config: {

    host                     : dev ? 'http://localhost:8080/' : '',
    api                      : dev ? 'http://localhost:8080/' : '',
    fbAppID                  : dev ? '' : '',
    sessionID                : '',
    cookieID                 : 'reon-react-boilerplate',
  },

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
}