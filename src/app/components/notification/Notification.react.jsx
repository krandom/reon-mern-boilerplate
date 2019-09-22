import { bindActionCreators } from 'redux';

import * as NotificationActions from '../../actions/Notification.actions';
import * as types from '../../actions/actionTypes';

import Toast from './Toast.react';

const Notifications = ({ notification, NotificationActions, }) => {

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
        </div>
    );
}


const mstp = state => ({
    notification: state.notification,
});

const mdtp = dispatch => ({
    NotificationActions: Redux.bindActionCreators(NotificationActions, dispatch),
});

export default ReactRedux.connect(mstp, mdtp)(Notifications);
