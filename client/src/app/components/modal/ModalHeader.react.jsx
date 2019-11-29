import { connect } from 'react-redux';
import { modalActions } from '../../reducers/modal.reducer';

const ModalHeader = ({ title, removeModalAction }) => {

	return (
		<div className='modal-header'>

			<div className='modal-header__title'>
				{title}
			</div>

			<div
				className='modal-header__close'
				onClick={removeModalAction}>
				<i className='fa fa-times' />
			</div>

		</div>
	);
};

const mdtp = {
	removeModalAction: modalActions.remove,
};

export default connect(null, mdtp)(ModalHeader);