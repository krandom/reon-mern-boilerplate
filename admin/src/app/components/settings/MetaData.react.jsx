import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { settingsActions } from '../../reducers/settings.reducer';

import Card from '../common/card/Card.react';
import CardHeader from '../common/card/CardHeader.react';
import CardBody from '../common/card/CardBody.react';

import MetaDataRouteDetails from './meta-data/MetaDataRouteDetails.react';
import SelectApplication from '../common/form/select/SelectApplication.react';
import Label from '../common/form/Label.react';

const MetaData = ({ metaData, getMetaDataAction }) => {
	const [selectedApp, setSelectedApp] = useState(null);

	useEffect(() => {
		getMetaDataAction();
	}, []);

	return (
		<div className='page'>
			<div className='page__content'>
				<div className='page__content--block'>
					<Card>
						<CardHeader
							title='Meta Data' />

						<CardBody>
							<Label
								label='Select Application' />
							<SelectApplication
								value={selectedApp?.sValue}
								onChange={option => setSelectedApp(option)}
							/>
						</CardBody>
					</Card>

					{ selectedApp &&
						<>
							<MetaDataRouteDetails
								selectedApp={selectedApp}
								metaData={metaData}
								key={selectedApp.sValue}
							/>
						</>
					}
				</div>
			</div>
		</div>
	);
};

const mstp = s => ({
	metaData: s.settings.metaData,
});

const mdtp = {
	getMetaDataAction: settingsActions.getMetaData,
};

export default connect(mstp, mdtp)(MetaData);
