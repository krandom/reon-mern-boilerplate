import { connect } from 'react-redux';

import { settingsActions } from '../../../reducers/settings.reducer';

import Card from '../../common/card/Card.react';
import CardHeader from '../../common/card/CardHeader.react';
import CardBody from '../../common/card/CardBody.react';

import Table from '../../common/table/Table.react';

const FeatureFlagsCard = ({
	application,
	featureFlags,
	environmentConstants,
	featureFlagConstants,
	setFeatureFlagsAction,
}) => {

	const getFlag = ({ clientEnv, key, clientApp }) => {
		let value = false;

		featureFlags.forEach(x => {
			if (x.clientEnv === clientEnv && x.key === key && x.clientApp === clientApp)
				value = x.value;
		});

		return value;
	};

	const getTableData = ({ clientApp }) => {
		return featureFlagConstants
			.filter(x => x.clientApp === clientApp)
			.map(x => {
				let returnObj = {
					id: x['id'],
					flagName: x['name'],
					description: x['description'],
					key: x['key'],
					clientApp,
				};

				environmentConstants.map(y => {
					returnObj[y.value] = getFlag({ clientEnv: y.key, key: x.key, clientApp });
				});

				return returnObj;
			});
	};

	const columns = {
		'flagName': 'Flag Name',
		'description': 'Description',
	};

	environmentConstants.forEach(x => {
		columns[x.value] = {
			title: x.name,
			type: {
				label: 'boolean',
				true: 'Enabled',
				false: 'Disabled',
			},
			sort: false,
			onClick: flag => {
				// TODO :: add confirm popup here
				setFeatureFlagsAction({
					id: flag.id,
					clientApp: application.value,
					clientEnv: x.value,
					key: flag.key,
					value: !flag[x.value],
				});
			},
		};
	});

	return (
		<Card>
			<CardHeader
				title={`${application.name} - Feature Flags`} />

			<CardBody>
				<Table
					columns={columns}
					data={getTableData({ clientApp: application.value })}
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
	setFeatureFlagsAction: settingsActions.setFeatureFlags,
};

export default connect(mstp, mdtp)(FeatureFlagsCard);
