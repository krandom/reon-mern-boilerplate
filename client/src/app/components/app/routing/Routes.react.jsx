import { Route, Switch } from 'react-router-dom';

import Dashboard from '../../dashboard/Dashboard.react';
import HelmetTemplate from './HelmetTemplate.react';
import PageNotFound from './PageNotFound.react';
import ResetPassword from '../../auth/ResetPassword.react';
import Sandbox from '../../sandbox/Sandbox.react';
import SandboxAuth from '../../sandbox/auth/SandboxAuth.react';
import VerifyEmail from '../../auth/VerifyEmail.react';

const Routes = () =>
	<>
		<HelmetTemplate />
		<Switch>
			<Route exact path='/' component={() => <Dashboard />} />
			<Route path='/verifyemail' component={VerifyEmail} />
			<Route path='/resetpassword' component={ResetPassword} />

			<Route exact path='/sandbox' component={Sandbox} />
			<Route exact path='/sandbox/auth' component={SandboxAuth} />

			<Route exact path='/404' component={PageNotFound} />
			<Route component={PageNotFound} />
		</Switch>
	</>;

export default Routes;
