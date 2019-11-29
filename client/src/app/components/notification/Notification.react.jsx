import { connect } from 'react-redux';

import Toast from './Toast.react';

const Notification = ({ notification, }) => {

	return (
		<div
			id='notification'
			className='notification'>

			<div className='notification__toast'>
				{ notification.toast.map(toast => {

					if (!toast.visible)
						return null;

					return (
						<Toast
							{...toast}
							key={toast.id} />
					);
				})}
			</div>
		</div>
	);
};

const mstp = state => ({
	notification: state.notification,
});

export default connect(mstp, null)(Notification);