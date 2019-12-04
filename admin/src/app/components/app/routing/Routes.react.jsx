import { Route, Switch } from 'react-router-dom';

import Dashboard from '../../dashboard/Dashboard.react';
import PageNotFound from './PageNotFound.react';
import Sandbox from '../../sandbox/Sandbox.react';
import Users from '../../users/Users.react';
import FeatureFlags from '../../settings/FeatureFlags.react';
import Constants from '../../settings/Constants.react';
import MetaData from '../../pages/MetaData.react';

const Routes = () =>
	<>
		<Switch>
			<Route exact path='/' component={() => <Dashboard />} />
			<Route path='/users' component={Users} />

			<Route path='/settings/feature-flags' component={FeatureFlags} />
			<Route path='/settings/constants' component={Constants} />

			<Route path='/pages/meta-data' component={MetaData} />

			<Route exact path='/sandbox' component={Sandbox} />

			<Route exact path='/404' component={PageNotFound} />
			<Route component={PageNotFound} />
		</Switch>
	</>;

export default Routes;
