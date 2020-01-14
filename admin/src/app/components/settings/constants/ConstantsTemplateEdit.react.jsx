import { useState } from 'react';
import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';
import { settingsActions } from '../../../reducers/settings.reducer';

import ModalHeader from '../../modal/ModalHeader.react';
import Button from '../../common/Button.react';
import Input from '../../common/form/Input.react';
import Label from '../../common/form/Label.react';

const ConstantsTemplateEdit = ({
	slug,
	title,
	constant = null,
	constants,
	disableSelectApp = false,
	applicationConstants,
	hideModalAction,
	setConstantsAction,
}) => {
	const [form, setForm] = useState({
		clientApp: constant?.clientApp || '',
		description: constant?.description || '',
		key: constant?.key || '',
		name: constant?.name || '',
		value: constant.value || '',
	});

	const { clientApp, key, name, value, description } = form;
	const updateForm = (key, value) => setForm({ ...form, [key]: value });

	const isValid = () => {
		return (
			name.length > 0 &&
			value.length > 0
		);
	};

	const isDuplicate = () => {
		if (constant)
			return false;

		if (
			clientApp === '' && constants.filter(x => x.name.toLowerCase() === name.toLowerCase())[0] ||
			constants.filter(x => x.name.toLowerCase().trim() === name.toLowerCase().trim() && (x.clientApp === clientApp || x.clientApp === null))[0]
		)
			return `Duplicate Name. Another constant with the same Name already exists in ${title}.`;

		if (
			clientApp === '' && constants.filter(x => x.key.toLowerCase() === key.toLowerCase())[0] ||
			constants.filter(x => x.key.toLowerCase() === key.toLowerCase() && (x.clientApp === clientApp || x.clientApp === null))[0]
		)
			return `Duplicate Key. Another constant with the same Key already exists in ${title}.`;

		if (
			clientApp === '' && constants.filter(x => x.value.toLowerCase() === value.toLowerCase())[0] ||
			constants.filter(x => x.value.toLowerCase() === value.toLowerCase() && (x.clientApp === clientApp || x.clientApp === null))[0]
		)
			return `Duplicate Value. Another constant with the same Value already exists in ${title}.`;

		return false;
	};

	return (
		<div className='modal modal__320'>
			<ModalHeader title={`${!constant ? 'Add' : 'Edit'} ${title}`} />
			<div className='modal__body'>

				{ !constant && !disableSelectApp &&
					<>
						<Label
							label='Applications'
							required
							info='Select application touched by this constant.'
						/>
						<select value={clientApp} onChange={e => updateForm('clientApp', e.target.value)}>
							<option value=''>All Applications</option>
							{ applicationConstants.map(x => <option value={x.value} key={x.value}>{x.name}</option>)}
						</select>
					</>
				}

				{ !constant &&
					<>
						<Label
							label='Name'
							required
							info='Set a name for your constant. This is the name displayed throughout your app.<br /><br />E.g. adding <span>Admin</span> to <span>User Roles</span> this could be named <span>Administrator</span>.'
						/>
						<Input
							value={name}
							onChange={e => updateForm('name', e.target.value)}
						/>

						<Label
							label='Key'
							info='Set a key for your constant. This refers to what your constant is named in the database.<br /><br />E.g. adding <span>Admin</span> to <span>User Roles</span> this could be named <span>admin</span>.<br /><br />This key is optional, but in general keep key and value identical.'
						/>
						<Input
							value={key}
							onChange={e => updateForm('key', e.target.value.trim().toLowerCase().replace(/[^a-z-]/g, ''))}
						/>

						<Label
							label='Value'
							required
							info='Set a value for your constant. This is the value saved to the database.<br /><br />E.g. adding <span>Admin</span> to <span>User Roles</span> this value could be <span>admin</span>.'
						/>
						<Input
							value={value}
							onChange={e => updateForm('value', e.target.value.trim().toLowerCase().replace(/[^a-z-]/g, ''))}
						/>
					</>
				}

				<Label label='Description' />
				<Input
					value={description}
					onChange={e => updateForm('description', e.target.value)}
				/>

				{ isDuplicate() &&
					isDuplicate()
				}

				<Button
					label={!constant ? 'Add' : 'Update'}
					onClick={() => {

						setConstantsAction({
							id: constant?.id || null,
							clientApp,
							description,
							key,
							name,
							value,
							slug,
							title,
						});

						hideModalAction();
					}}
					width='120px'
					style={{ marginTop: 20 }}
					disabled={!isValid() || isDuplicate()}
				/>
			</div>
		</div>
	);
};

const mstp = s => ({
	applicationConstants: s.settings.constants?.applications,
});

const mdtp = {
	hideModalAction: modalActions.hide,
	setConstantsAction: settingsActions.setConstants,
};

export default connect(mstp, mdtp)(ConstantsTemplateEdit);
