import { Route, Switch } from 'react-router-dom';

import Dashboard from '../../dashboard/Dashboard.react';
import HelmetTemplate from './HelmetTemplate.react';
import PageNotFound from './PageNotFound.react';
import Sandbox from '../../sandbox/Sandbox.react';
import Users from '../../users/Users.react';
import FeatureFlags from '../../settings/FeatureFlags.react';

const Routes = () =>
	<>
		<HelmetTemplate />
		<Switch>
			<Route exact path='/' component={() => <Dashboard />} />
			<Route path='/users' component={Users} />
			<Route path='/settings/feature-flags' component={FeatureFlags} />

			<Route exact path='/sandbox' component={Sandbox} />

			<Route exact path='/404' component={PageNotFound} />
			<Route component={PageNotFound} />
		</Switch>
	</>;

export default Routes;
