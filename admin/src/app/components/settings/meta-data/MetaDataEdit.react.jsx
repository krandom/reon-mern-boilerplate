import { useState } from 'react';
import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';
import { settingsActions } from '../../../reducers/settings.reducer';

import ModalHeader from '../../modal/ModalHeader.react';
import Button from '../../common/Button.react';
import Select from '../../common/form/Select.react';
import Label from '../../common/form/Label.react';
import Input from '../../common/form/Input.react';

const MetaDataEdit = ({ clientApp, route, metaDataConstants, hideModalAction, setMetaDataAction }) => {
	// const [id] = useState(uuid());
	const [form, setForm] = useState({
		type: '',
		key: '',
		value: '',
		content: '',
	});
	const { type, key, value, content } = form;

	const isValid = () => {
		return (
			value.length > 0 &&
			content.length > 0
		);
	};

	return (
		<div className='modal'>
			<ModalHeader title={`Edit ${clientApp === 'dev' ? 'Development' : 'Production'} Flags`} />

			<div className='modal__body'>
				<Label label='Select Meta Data' />
				<Select
					value={value}
					options={metaDataConstants.map(x => ({
						...x,
						sLabel: x.value,
						sValue: x.value,
					}))}
					onChange={x => {
						setForm({
							...form,
							type: x.type,
							key: x.key,
							value: x.value,
						});
					}}
				/>

				<Label label='Type' />
				<Input
					value={type}
					disabled
				/>

				<Label label='Key' />
				<Input
					value={key}
					disabled
				/>

				<Label label='value' />
				<Input
					value={value}
					disabled
				/>

				<Label label='Content' />
				<Input
					value={content}
					onChange={e => setForm({ ...form, content: e.target.value })}
				/>

				<Button
					label='Add'
					onClick={() => {
						const { id } = route;

						setMetaDataAction({
							id,
							content,
							type,
							key,
							value,
						});

						hideModalAction();
					}}
					width='120px'
					style={{ marginTop: 20 }}
					disabled={!isValid()}
				/>

			</div>
		</div>
	);
};

const mstp = s => ({
	metaDataConstants: s.settings.constants.metaData,
});

const mdtp = {
	hideModalAction: modalActions.hide,
	setMetaDataAction: settingsActions.setMetaData,
};

export default connect(mstp, mdtp)(MetaDataEdit);