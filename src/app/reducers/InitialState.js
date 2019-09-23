var dev = window.location.href.indexOf('localhost') !== -1 ? true : false;

export default {
  app: {
  	booted: false,
  	isLoggedIn: false,
    sessionID: '',
    mainNav: [],
  },

  modal: {
    visible: false,
    windows: [],
  },

  auth: {
    popup: null,
  },

  config: {
  	endpoints: {
      auth: {
        login: '//reonsolutions.com/mock-server/login.php',
        logout: '//reonsolutions.com/mock-server/logout.php',
      },
      user: {
        getProfile: '//reonsolutions.com/mock-server/getProfile.php',
      }
    },
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
}