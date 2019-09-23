import 'babel-polyfill';

import { Provider } from 'react-redux';
import { mainStore, history } from './store/store';
import { Router } from 'react-router-dom';

import App from './components/app/App.react';

export const store = mainStore();

ReactDOM.render(
	<Provider store={store}>
    	<App />
	</Provider>,

    document.getElementById('template')
);
