import { Router, Route, Switch, } from 'react-router-dom';
import { history } from '../../../store/store';

import Dashboard from '../../dashboard/Dashboard.react';
import Sandbox from '../../sandbox/Sandbox.react';
import PageNotFound from './PageNotFound.react';

const Routes = () => (

	<Switch>
        <Route exact path='/' component={() => <Dashboard />} />
        <Route exact path='/sandbox' component={Sandbox} />

        <Route exact path='/404' component={PageNotFound} />
        <Route component={PageNotFound} />
	</Switch>

);

export default Routes;