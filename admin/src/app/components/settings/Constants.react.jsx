import { useEffect } from 'react';
import { connect } from 'react-redux';

import { settingsActions } from '../../reducers/settings.reducer';

import ConstantsTemplate from './constants/ConstantsTemplate.react';
import ConstantsMetaData from './constants/ConstantsMetaData.react';

const Constants = ({ constants, getConstantsAction }) => {
	useEffect(() => {
		getConstantsAction();
	}, []);

	// TODO :: split to pages and make tables per app
	return (
		<div className='page'>
			<div className='page__content'>
				<div className='page__content--block'>
					<ConstantsTemplate
						title='Applications'
						slug='applications'
						disableSelectApp
						disableAdd
						hideApp
						constants={constants.applications || []}
					/>
					<ConstantsTemplate
						title='User Roles'
						slug='user-roles'
						hideApp
						disableSelectApp
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