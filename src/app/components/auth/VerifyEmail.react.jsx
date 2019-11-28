import { useEffect } from 'react';
import { connect, Redirect } from 'react-redux';
import { history } from '../../store/store';
import { authActions } from '../../reducers/auth.reducer';
import { notificationActions } from '../../reducers/notification.reducer';

const VerifyEmail = ({ booted, addToastAction, verifyEmailAction }) => {
	var urlParams = new URLSearchParams(location.search);

	useEffect(() => {

		if (!booted)
			return;

		if (!urlParams.has('email') || !urlParams.has('code')) {
			addToastAction({
				type: 'warning',
				message: 'Your email address could not be verified!'
			})
		} else {
			verifyEmailAction({
				email: urlParams.get('email'),
				code: urlParams.get('code'),
			})
		}

		history.push('/');
	}, [booted])

	return null;
};

const mstp = s => ({
	booted: s.app.booted,
});

const mdtp = {
  addToastAction: notificationActions.addToast,
  verifyEmailAction: authActions.verifyEmail,
};

export default connect(mstp, mdtp)(VerifyEmail);