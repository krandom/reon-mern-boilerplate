import { useState } from 'react';
import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';
import { settingsActions } from '../../../reducers/settings.reducer';

import ModalHeader from '../../modal/ModalHeader.react';
import Button from '../../common/Button.react';

// TODO :: this whole component is obsolete...
const AddFeatureFlag = ({ clientApp, featureFlagConstants, hideModalAction, setFeatureFlagsAction }) => {
	const [id] = useState(uuid());
	const [selectedFlag, setSelectedFlag] = useState('auth');
	const [environment, setEnvironment] = useState('dev');
	const [value, setValue] = useState('on');

	const isValid = () => {
		return (
			selectedFlag.length > 0 &&
			value.length > 0 &&
			environment.length > 0
		);
	};

	return (
		<div className='modal'>
			<ModalHeader title={`Edit ${clientApp === 'dev' ? 'Development' : 'Production'} Flags`} />

			{/* TODO :: make component for select... */}
			<select value={selectedFlag} onChange={e => { setSelectedFlag(e.target.value); }}>
				<option value=''>Select Flag</option>
				{ featureFlagConstants
					.filter(x => x.clientApp === clientApp)
					.map(x =>
						<option
							value={x.name}
							key={`${id}${x.name}`}
						>
							{x.name}
						</option>
					)
				}
			</select>

			<select value={value} onChange={e => { setValue(e.target.value); }}>
				<option value=''>Select Value</option>
				<option value='on'>On</option>
				<option value='off'>Off</option>
			</select>

			<select value={environment} onChange={e => { setEnvironment(e.target.value); }}>
				<option value=''>Select Environment</option>
				<option value='dev'>Development</option>
				<option value='production'>Production</option>
			</select>

			<Button
				label='Update'
				onClick={() => {

					setFeatureFlagsAction({
						id: null,
						clientApp,
						environment,
						key: selectedFlag,
						value: value === 'on' ? true : false,
					});

					hideModalAction();
				}}
				width='120px'
				style={{ marginTop: 20 }}
				disabled={!isValid()}
			/>
		</div>
	);
};

const mdtp = {
	hideModalAction: modalActions.hide,
	setFeatureFlagsAction: settingsActions.setFeatureFlags,
};

export default connect(null, mdtp)(AddFeatureFlag);
