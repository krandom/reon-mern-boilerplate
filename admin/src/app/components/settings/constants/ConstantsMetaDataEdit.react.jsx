import { useState } from 'react';
import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';
import { settingsActions } from '../../../reducers/settings.reducer';

import ModalHeader from '../../modal/ModalHeader.react';
import Button from '../../common/Button.react';
import Input from '../../common/form/Input.react';
import Label from '../../common/form/Label.react';

const ConstantsTemplateEdit = ({ constant = null, constants, hideModalAction, setMetaDataConstantsAction }) => {
	const [form, setForm] = useState({
		group: constant?.group || '',
		type: constant?.type || '',
		key: constant?.key || '',
		value: constant?.value || '',
		description: constant?.description || '',
		url: constant?.url || '',
	});

	const { group, type, key, value, description, url } = form;
	const updateForm = (key, value) => setForm({ ...form, [key]: value });

	const isValid = () => {
		return (
			['meta'].includes(type) &&
			type.length > 0 &&
			['name', 'property', 'itemprop'].includes(key) &&
			key.length > 0 &&
			value.length > 0
		);
	};

	const isDuplicate = () => {
		if (constant)
			return false;

		if (constants.filter(x => x.value.toLowerCase() === value.toLowerCase())[0])
			return 'Duplicate Value. Another constant with the same Value already exists.';

		return false;
	};

	return (
		<div className='modal modal__320'>
			<ModalHeader title={`${!constant ? 'Add' : 'Edit'} Meta Data Constants`} />
			<div className='modal__body'>

				<Label
					label='Group'
					info='Group your tags for a better overview.'
				/>
				<Input
					value={group}
					onChange={e => updateForm('group', e.target.value)}
				/>

				{ !constant &&
					<>
						<Label
							label='Tag Type'
							required
							info='Accepted types are <span>meta</span>.'
						/>
						<Input
							value={type}
							placeholder='title or meta'
							onChange={e => updateForm('type', e.target.value.trim().toLowerCase().replace(/[^a-z-]/g, ''))}
						/>

						<Label
							label='Key'
							required
							info='Accepted types are <span>name</span>, <span>property</span> and <span>itemprop</span>.'
						/>
						<Input
							value={key}
							placeholder='name, property or itemprop'
							onChange={e => updateForm('key', e.target.value.trim().toLowerCase().replace(/[^a-z-]/g, ''))}
						/>

						<Label
							label='Value'
							required
							info='Accepted types are <span>name</span>, <span>property</span> and <span>itemprop</span>.'
						/>
						<Input
							value={value}
							onChange={e => updateForm('value', e.target.value.trim().toLowerCase())}
						/>
					</>
				}

				<Label
					label='Description'
					info='Tag Description.'
				/>
				<Input
					value={description}
					onChange={e => updateForm('description', e.target.value)}
				/>

				<Label
					label='Url'
					info='Link to source about this tag.'
				/>
				<Input
					value={url}
					onChange={e => updateForm('url', e.target.value)}
				/>

				{ isDuplicate() &&
					isDuplicate()
				}

				<Button
					label={!constant ? 'Add' : 'Update'}
					onClick={() => {

						setMetaDataConstantsAction({
							id: constant?.id || null,
							group,
							type,
							key,
							value,
							description,
							url,
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

const mdtp = {
	hideModalAction: modalActions.hide,
	setMetaDataConstantsAction: settingsActions.setMetaDataConstants,
};

export default connect(null, mdtp)(ConstantsTemplateEdit);