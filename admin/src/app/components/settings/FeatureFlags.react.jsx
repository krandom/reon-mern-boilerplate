import { useEffect } from 'react';
import { connect } from 'react-redux';

import { settingsActions } from '../../reducers/settings.reducer';

import FeatureFlagsCard from './feature-flags/FeatureFlagsCard.react';

const FeatureFlags = ({
	applicationConstants,
	getFeatureFlagsAction,
}) => {
	useEffect(() => {
		getFeatureFlagsAction();
	}, []);

	return (
		<div className='page'>
			<div className='page__content'>
				<div className='page__content--block'>

					{ applicationConstants.map(x =>
						<FeatureFlagsCard
							application={x}
							key={x.id}
						/>
					)}

				</div>
			</div>
		</div>
	);
};

const mstp = s => ({
	applicationConstants: s.settings.constants?.applications || [],
});

const mdtp = {
	getFeatureFlagsAction: settingsActions.getFeatureFlags,
};

export default connect(mstp, mdtp)(FeatureFlags);
