import { useState } from 'react';
import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';
import { settingsActions } from '../../../reducers/settings.reducer';

import Card from '../../common/card/Card.react';
import CardHeader from '../../common/card/CardHeader.react';
import CardBody from '../../common/card/CardBody.react';

import Table from '../../common/table/Table.react';
import Button from '../../common/Button.react';
import EditFeatureFlags from './EditFeatureFlags.react';

const FeatureFlagsCard = ({
	application,
	featureFlags,
	environmentConstants,
	featureFlagConstants,
	addModalAction,
}) => {

	const getFlag = ({ environment, key }) => {
		let value = 'false';

		featureFlags.forEach(x => {
			if (x.environment === environment && x.key === key)
				value = x.value.toString();
		});

		return value;
	};

	const getTableData = ({ app }) => {
		return featureFlagConstants
			.filter(x => x.app === app)
			.map(x => {
				let returnObj = {
					flagName: x['name'],
					description: x['description'],
				};

				environmentConstants.map(y => {
					returnObj[y.value] = getFlag({ environment: y.key, key: x.key });
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

	const tableData = getTableData({ app: application.value });

	return (
		<Card>
			<CardHeader
				title={`${application.name} - Feature Flags`} />

			<CardBody>
				<Table
					columns={columns}
					data={tableData}
				/>
				<Button
					label='Edit flags'
					onClick={() => {
						addModalAction({
							component:
								<EditFeatureFlags
									// TODO :: send flag here on edit
									app={application.value}
									featureFlagConstants={featureFlagConstants}
								/>,
						});
					}}
					width='120px'
					style={{ marginTop: 20 }}
				/>
				<Button
					label='Add flags'
					onClick={() => {
						addModalAction({
							component:
								<EditFeatureFlags
									add={true}
									app={application.value}
									featureFlagConstants={featureFlagConstants}
								/>,
						});
					}}
					width='120px'
					style={{ marginTop: 20 }}
				/>
			</CardBody>
		</Card>
	);
};

const mstp = s => ({
	featureFlags: s.settings.featureFlags,
	environmentConstants: s.settings.constants?.environments || [],
	featureFlagConstants: s.settings.constants?.featureFlags || [],
});

const mdtp = {
	addModalAction: modalActions.add,
};

export default connect(mstp, mdtp)(FeatureFlagsCard);
