import { Router, Route, Switch, } from 'react-router-dom';
import { history } from '../../../store/store';

import Dashboard from '../../dashboard/Dashboard.react';
import VerifyEmail from '../../auth/VerifyEmail.react';
import Sandbox from '../../sandbox/Sandbox.react';
import SandboxAuth from '../../sandbox/auth/SandboxAuth.react';
import PageNotFound from './PageNotFound.react';

const Routes = () => (

	<Switch>
        <Route exact path='/' component={() => <Dashboard />} />
				<Route path='/verifyemail' component={VerifyEmail} />

        <Route exact path='/sandbox' component={Sandbox} />
        <Route exact path='/sandbox/auth' component={SandboxAuth} />

        <Route exact path='/404' component={PageNotFound} />
        <Route component={PageNotFound} />
	</Switch>

);

export default Routes;