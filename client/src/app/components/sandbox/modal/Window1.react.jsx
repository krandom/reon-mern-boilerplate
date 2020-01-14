import { connect } from 'react-redux';
import { modalActions } from '../../../reducers/modal.reducer';

import ModalHeader from '../../modal/ModalHeader.react';
import Window2 from './Window2.react';

const Window1 = ({ addModalAction }) => {
	return (
		<div className="modal">
			<ModalHeader title="Window 1" />

			<div className="modal__content">
				This is a popup
				<br />
				<br />
				Now lets open another one!
				<br />
				<br />
				<span
					onClick={() => {
						addModalAction({ component: <Window2 /> });
					}}
					style={{ cursor: 'pointer' }}
				>
					Click Here!
				</span>
			</div>
		</div>
	);
};

const mdtp = {
	addModalAction: modalActions.add,
};

export default connect(null, mdtp)(Window1);
