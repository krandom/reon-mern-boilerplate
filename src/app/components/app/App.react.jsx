import { Router } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import * as AppActions from '../../actions/App.actions';

import {browserHistory} from 'react-router';
import history from '../../history';

import Cookies from 'universal-cookie';
import {bindActionCreators} from 'redux';

import Main from '../main/Main.react';
import Header from '../header/Header.react';
import Notification from '../notification/Notification.react';


class App extends React.Component {

    componentWillMount() {
        /*
            Set this if you want to use cookies
        */

        const cookies = new Cookies();
        if (cookies.get('ubudget'))
            this.props.AppActions.validateCookie({ cookie : cookies.get('ubudget') });
    }

    render() {
        console.log('APP STATE -------------------------------', this.props.state);
        const { count, inc } = this.props;

        return [
            <Router key='1' history={history}>
                <div
                    id='app'
                    className='app'>

                    <Header />

                    <div className='app__content'>

                        <Main />
                    </div>

                    </div>

            </Router>,

            <Notification />
        ];
    }
}

const mstp = state => ({
    state,
});

const mdtp = dispatch => ({
    AppActions: bindActionCreators(AppActions, dispatch),
});

export default connect(mstp, mdtp)(App);