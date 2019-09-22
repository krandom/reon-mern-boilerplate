var dev = window.location.href.indexOf('localhost') !== -1 ? true : false;

export default {
  app : {
  	isLoggedIn               : false,
  },

  user: {
  	profile                  : null,
  },

  config: {
    host                     : dev ? 'http://localhost:3000/' : '',
    api                      : dev ? 'http://localhost:3000/' : '',
    fbAppID                  : dev ? '181125889188096' : '',
    sessionID                : '',
    cookieID                 : 'reon-react-boilerplate',
  },

  notifications: {
    toast                    : [],
    showCookieWarning        : true,
  },
}