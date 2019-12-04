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
import ConstantsTemplate from './constants/ConstantsTemplate.react';
import ConstantsMetaData from './constants/ConstantsMetaData.react';

const Constants = ({ constants, getConstantsAction }) => {
	useEffect(() => {
		getConstantsAction();
	}, []);

	console.log('constants', constants)

	// const flagDescription = [
	// 	{ name: 'sandbox', description: 'Allow sandbox environment' },
	// 	{ name: 'auth', description: 'Login/Signup' },
	// ];

	// const getFlag = ({ app, environment, name }) => {
	// 	let value = 'false';

	// 	featureFlags.forEach(x => {
	// 		if (x.app === app && x.environment === environment && x.name === name)
	// 			value = x.value.toString();
	// 	});

	// 	return value;
	// };

	// const getTableData = ({ app }) => {
	// 	return Object.values(flagDescription).map(x => {
	// 		return {
	// 			flagName: x['name'],
	// 			dev: getFlag({ app, environment: 'dev', name: x['name'] }),
	// 			production: getFlag({ app, environment: 'production', name: x['name'] }),
	// 			description: x['description'],
	// 		};
	// 	});
	// };

	// const columns = {
	// 	'Flag Name': 'flagName',
	// 	'Development': 'dev',
	// 	'Production': 'production',
	// 	'Description': 'description',
	// };

	// const clientTable = getTableData({ app: 'client' });
	// const adminTable = getTableData({ app: 'admin' });

	return (
		<div className='page'>
			<div className='page__content'>
				<div className='page__content--block'>
					<ConstantsTemplate
						title='User Roles'
						slug='user-roles'
						constants={constants.userRoles || []}
					/>
					<ConstantsTemplate
						title='Environments'
						slug='environments'
						constants={constants.environments || []}
					/>
					<ConstantsTemplate
						title='Feature Flags'
						slug='feature-flags'
						constants={constants.featureFlags || []}
					/>
					<ConstantsMetaData
						title='Meta Data'
						// slug='feature-flags'
						constants={constants.metaData || []}
					/>
				</div>
			</div>
		</div>
	);
};

const mstp = s => ({
	constants: s.settings.constants,
});

const mdtp = {
	getConstantsAction: settingsActions.getConstants,
};

export default connect(mstp, mdtp)(Constants);

/*
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
*/