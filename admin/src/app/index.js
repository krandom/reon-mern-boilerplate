import 'babel-polyfill';

import { Provider } from 'react-redux';
import { mainStore } from './store/store';

import App from './components/app/App.react';

export const store = mainStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,

	document.getElementById('template')
);
