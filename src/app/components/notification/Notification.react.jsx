import { connect} from 'react-redux';
import { notificationActions } from '../../reducers/notification.reducer';

import Toast from './Toast.react';

const Notification = ({ notification, NotificationActions, }) => {

    return (
        <div
            id='notification'
            className='notification'>

            <div className='notification__toast'>
                { notification.toast.map((toast, i) => {

                    if (!toast.visible)
                        return null;

                    return (
                        <Toast
                            {...toast}
                            key={toast.ID} />
                    );
                })}
            </div>


        </div>
    );
}

const mstp = state => ({
    notification: state.notification,
});

const mdtp = dispatch => ({
    removeToastAction: notificationActions.removeToast,
});

export default connect(mstp, mdtp)(Notification);


/*

            { notification.showCookieWarning &&
                <div className='notification__cookie'>
                    <div
                        className='notification__cookie--close'
                        onClick={() => { NotificationActions.hideCookieWarning(); }}>X</div>

                    <span>
                        Hi! We are using cookies!
                    </span>
                </div>
            }

*/