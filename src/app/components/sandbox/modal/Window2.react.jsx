import { connect } from 'react-redux';
import { modalActions } from '../../../reducers/modal.reducer';

import ModalHeader from '../../modal/ModalHeader.react';
import Window2 from './Window2.react';

const Window1 = ({ showModalAction }) => {

	return (
		<div className='modal'>

			<ModalHeader
				title='Window 2' />

			<div className='modal__content'>
				This is another popup!

				<br /><br />

				Now you can close this and go back to the first one.
			</div>
		</div>
	)
}

const mdtp = {
	showModalAction: modalActions.show,
};

export default connect(null, null)(Window1);