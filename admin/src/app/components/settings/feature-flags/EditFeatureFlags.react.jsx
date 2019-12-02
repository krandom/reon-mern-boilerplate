import { useState } from 'react';
import { connect } from 'react-redux';

// import { usersActions } from '../../../reducers/users.reducer';
import { modalActions } from '../../../reducers/modal.reducer';
import { settingsActions } from '../../../reducers/settings.reducer';

import ModalHeader from '../../modal/ModalHeader.react';
import Button from '../../common/Button.react';

const EditFeatureFlags = ({ app, hideModalAction, setFeatureFlagsAction }) => {
	const [id] = useState(uuid());
	const [selectedFlag, setSelectedFlag] = useState('auth');
	const [environment, setEnvironment] = useState('dev');
	const [value, setValue] = useState('true');

	const flagDescription = [
		{ name: 'sandbox', description: 'Allow sandbox environment' },
		{ name: 'auth', description: 'Login/Signup' },
	];

	const isValid = () => {
		return (
			selectedFlag.length > 0 &&
			value.length > 0 &&
			environment.length > 0
		);
	};

	return (
		<div className='modal'>
			<ModalHeader title={`Edit ${app === 'dev' ? 'Development' : 'Production'} Flags`} />

			<select value={selectedFlag} onChange={e => { setSelectedFlag(e.target.value); }}>
				<option value=''>Select Flag</option>
				{ flagDescription.map(x =>
					<option
						value={x.name}
						key={`${id}${x.name}`}
					>
						{x.name}
					</option>
				)}
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
						app,
						environment,
						name: selectedFlag,
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

export default connect(null, mdtp)(EditFeatureFlags);
