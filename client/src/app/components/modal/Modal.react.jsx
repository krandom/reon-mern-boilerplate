import { connect } from 'react-redux';
import { modalActions } from '../../reducers/modal.reducer';

import ModalWindow from './ModalWindow.react';

const Modal = ({ windows }) => {
	if (windows.length === 0) return null;

	return (
		<div className="fullscreen">
			{windows.length > 0 && <div className="overlay" />}

			{windows.map(x =>
				<ModalWindow key={x.id}>{x.component}</ModalWindow>
			)}
		</div>
	);
};

const mstp = s => ({
	windows: s.modal.windows,
});

const mdtp = {
	showModalAction: modalActions.show,
};

export default connect(mstp, mdtp)(Modal);
