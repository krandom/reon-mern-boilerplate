var dev = window.location.href.indexOf('localhost') !== -1 ? true : false;

export default {
  app: {
  	booted: false,
  	isLoggedIn: false,
  	token: null,
    showHamburgerMenu: false,
    mainNav: [],
		user: null,

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
      	signup: '//localhost:5000/api/auth/signup',
      	login: '//localhost:5000/api/auth/login',
      	logout: '//localhost:5000/api/auth/logout',
      }
    },
  },

  modal: {
    visible: false,
    windows: [],
  },

  auth: {
    popup: null,
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