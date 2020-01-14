import { useState } from 'react';
import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';
import { settingsActions } from '../../../reducers/settings.reducer';

import ModalHeader from '../../modal/ModalHeader.react';
import Button from '../../common/Button.react';
import Select from '../../common/form/Select.react';
import Label from '../../common/form/Label.react';
import Input from '../../common/form/Input.react';

const MetaDataAddRoute = ({ selectedApp, selectedRoute = null, metaData, hideModalAction, setMetaDataAction }) => {
	// const [id] = useState(uuid());
	const [form, setForm] = useState({
		route: selectedRoute?.route || '/',
		title: selectedRoute?.title || '',
	});
	const { route, title } = form;

	const formatRoute = route => {
		/*
			TODO :: format and make sure it always starts with an /
							not end with /
							no more than one / in a row
		*/
		route = route.trim().toLowerCase().replace(/[^a-z/]/g, '');

		if (route.length === 0)
			route = '/';

		setForm({ ...form, route });
	};

	const isValid = () => {
		return (
			route.length > 0 &&
			route.charAt(0) === '/'
		);
	};

	const isDuplicate = () => {
		if (selectedRoute)
			return false;

		if (metaData.filter(x => x.clientApp === selectedApp && x.route === route )[0])
			return 'This Route is already set up.';

		return false;
	};

	console.log('test',

		metaData.filter(x => {
			console.log('x', x)
			// x.clientApp === selectedApp.sValue && x.route === route,
		})
	)
	console.log('selectedApp', selectedApp)
	console.log('route', route)
	return (
		<div className='modal'>
			<ModalHeader title={`Add Route for ${selectedApp.sValue}`} />

			<div className='modal__body'>

				<Label label='Route' required />
				<Input
					value={route}
					disabled={selectedRoute}
					onChange={e => formatRoute(e.target.value)}
				/>

				<Label label='Title' />
				<Input
					value={title}
					onChange={e => setForm({ ...form, title: e.target.value })}
				/>

				{ isDuplicate() &&
					<div style={{ marginBottom: 20 }}>{isDuplicate()}</div>
				}

				<Button
					label='Add'
					disabled={!isValid() && !isDuplicate()}
					onClick={() => {
						setMetaDataAction({
							id: selectedRoute?.id || null,
							clientApp: selectedApp,
							route,
							title,
						});

						hideModalAction();
					}}
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

export default connect(mstp, mdtp)(MetaDataAddRoute);