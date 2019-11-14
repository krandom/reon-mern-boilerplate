var dev = window.location.href.indexOf('localhost') !== -1 ? true : false;

export default {
  app: {
  	booted: false,
  	isLoggedIn: false,
    mainNav: [],
    showHamburgerMenu: false,

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
      	signup: '//localhost:5000/api/auth/signup',
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