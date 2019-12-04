import { useEffect } from 'react';
import { connect } from 'react-redux';

import { modalActions } from '../../reducers/modal.reducer';
import { settingsActions } from '../../reducers/settings.reducer';

import Card from '../common/card/Card.react';
import CardHeader from '../common/card/CardHeader.react';
import CardBody from '../common/card/CardBody.react';

import Table from '../common/table/Table.react';
import Button from '../common/Button.react';
import EditFeatureFlags from './feature-flags/EditFeatureFlags.react';

const FeatureFlags = ({
	featureFlags,
	featureFlagConstants,
	environmentConstants,
	addModalAction,
	getFeatureFlagsAction,
}) => {
	useEffect(() => {
		getFeatureFlagsAction();
	}, []);

	// TODO :: further nest in applications as well (client/admin/...)

	const getFlag = ({ app, environment, name }) => {
		let value = 'false';

		featureFlags.forEach(x => {
			if (x.app === app && x.environment === environment && x.name === name)
				value = x.value.toString();
		});

		return value;
	};

	const getTableData = ({ app }) => {
		return featureFlagConstants.map(x => {
			let returnObj = {
				flagName: x['name'],
				description: x['description'],
			};

			environmentConstants.map(y => {
				returnObj[y.value] = getFlag({ app, environment: y.key, name: x.value });
			});

			return returnObj;
		});
	};

	const columns = {
		'Flag Name': 'flagName',
		'Description': 'description',
	};

	environmentConstants.forEach(x => {
		columns[x.name] = x.value;
	});

	const clientTable = getTableData({ app: 'client' });
	const adminTable = getTableData({ app: 'admin' });

	console.log('featureFlags', featureFlags);
	console.log('featureFlagConstants', featureFlagConstants);

	return (
		<div className='page'>
			<div className='page__content'>
				<div className='page__content--block'>
					<Card>
						<CardHeader
							title='Client App Feature Flags' />

						<CardBody>
							<Table
								columns={columns}
								data={clientTable}
							/>
							<Button
								label='Edit flags'
								onClick={() => {
									addModalAction({
										component:
											<EditFeatureFlags
												app='client'
											/>,
									});
								}}
								width='120px'
								style={{ marginTop: 20 }}
							/>
						</CardBody>
					</Card>

					<Card>
						<CardHeader
							title='Admin App Feature Flags' />

						<CardBody>
							<Table
								columns={columns}
								data={adminTable}
							/>
							<Button
								label='Edit flags'
								onClick={() => {
									addModalAction({
										component:
											<EditFeatureFlags
												app='admin'
											/>,
									});
								}}
								width='120px'
								style={{ marginTop: 20 }}
							/>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
};

const mstp = s => ({
	featureFlags: s.settings.featureFlags,
	environmentConstants: s.settings.constants?.environments || [],
	featureFlagConstants: s.settings.constants?.featureFlags || [],
});

const mdtp = {
	addModalAction: modalActions.add,
	getFeatureFlagsAction: settingsActions.getFeatureFlags,
};

export default connect(mstp, mdtp)(FeatureFlags);
