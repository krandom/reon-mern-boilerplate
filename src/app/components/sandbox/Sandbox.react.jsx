import { connect } from 'react-redux';
import { notificationActions } from '../../reducers/notification.reducer';
import { sidebarActions } from '../../reducers/sidebar.reducer';
import { modalActions } from '../../reducers/modal.reducer';

import Page1 from './sidebar/Page1.react';
import Window1 from './modal/Window1.react';

const Sandbox = ({ state, addToastAction, addSidebarPageAction, addModalAction, }) => {

  return (
    <div className='page'>
			<div className='page__content'>

				<div className='sandbox__block'>
					<div className='sandbox__title'>
						Toast Notifications
					</div>

					<div className='sandbox__description'>
						A Toast is a non modal, unobtrusive window element used to display brief, auto-expiring windows of information to a user.
					</div>

					<button
						className='sandbox__success'
						onClick={() => addToastAction({ message: 'This was a great success!' }) }>

						Success
					</button>

					<button
						className='sandbox__warning'
						onClick={() => addToastAction({ message: 'This is a warning!', type: 'warning' }) }>

						Warning
					</button>

					<button
						className='sandbox__info'
						onClick={() => addToastAction({ message: 'Did you know?', type: 'info' }) }>

						Info
					</button>

					<button
						className='sandbox__error'
						onClick={() => addToastAction({ message: 'Error Error Error!!!', type: 'error' }) }>

						Error
					</button>
				</div>

				<div className='sandbox__block'>
					<div className='sandbox__title'>
						Sidebar
					</div>

					<div className='sandbox__description'>
						Simple sidebar with transition
					</div>

					<button
						className='sandbox__success'
						onClick={() => {
							addSidebarPageAction({ page: <Page1 /> });
						}}>

						Open
					</button>
				</div>

				<div className='sandbox__block'>
					<div className='sandbox__title'>
						Modal
					</div>

					<div className='sandbox__description'>
						Put simply, a modal box is a scripted effect that allows you to overlay a small element over a website. The primary benefit of modal boxes it that they avoid the need to use of conventional window pop-ups or page reloads. In short, modal dialog windows are a means to swiftly show information to users on the same page they are working on, thus improving the usability of your site and decreasing unnecessary page reloads.
					</div>

					<button
						className='sandbox__success'
						onClick={() => {
							addModalAction({ component: <Window1 /> });
						}}>

						Open
					</button>
				</div>

			</div>
    </div>
  );
}

const mstp = s => ({
    state: s,
});

const mdtp = {
  addToastAction: notificationActions.addToast,
	addSidebarPageAction: sidebarActions.addPage,
	addModalAction: modalActions.add,
};

export default connect(mstp, mdtp)(Sandbox);