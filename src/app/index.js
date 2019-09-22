import App from './components/app/App.react';

import { AppContainer } from 'react-hot-loader';
// import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';

// import history from './history';
// import { Router, Route, Link } from 'react-router-dom';
// import * as reducers from './store/Reducers';
// import { CookiesProvider } from 'react-cookie';
''
import { mainStore } from './store/Store';
const store = mainStore();

const render = App => {
    ReactDOM.render(
        <AppContainer>
    		<Provider store={store}>
            	<App />
    		</Provider>
        </AppContainer>,

        document.getElementById('template')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./components/app/App.react', () => render(App));
}