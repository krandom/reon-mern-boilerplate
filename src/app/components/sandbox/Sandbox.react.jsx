import * as NotificationActions from '../../actions/Notification.actions';
import { bindActionCreators } from 'redux';
import * as types from '../../actions/actionTypes';

const Sandbox = ({ state, NotificationActions, }) => {

    return (
        <div
            id='sandbox'
            className='sandbox'>

            Sandbox

            <div className='' onClick={() => { NotificationActions.addToast(); }}>Add Toast</div>

        </div>
    );
}


const mstp = state => ({
    state,
});

const mdtp = dispatch => ({
    NotificationActions: Redux.bindActionCreators(NotificationActions, dispatch),
});

export default ReactRedux.connect(mstp, mdtp)(Sandbox);