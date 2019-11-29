import ModalHeader from '../../modal/ModalHeader.react';

const Window1 = () => {

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
	);
};

export default Window1;