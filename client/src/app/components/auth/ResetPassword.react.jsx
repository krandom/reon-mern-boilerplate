import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { history } from '../../store/store';
import { authActions } from '../../reducers/auth.reducer';
import { notificationActions } from '../../reducers/notification.reducer';

import Input from '../common/form/Input.react';

const ResetPassword = ({ booted, addToastAction, resetPasswordAction }) => {
	var urlParams = new URLSearchParams(location.search);

	const [resetPwdForm, setResetPwdForm] = useState({
		email: '',
		code: '',
		password: '',
		confirmPassword: '',
	});

	useEffect(() => {

		if (!booted)
			return;

		if (!urlParams.has('email') || !urlParams.has('code')) {
			addToastAction({
				type: 'warning',
				message: 'Something went wrong!'
			});

			history.push('/');
		} else {
			setResetPwdForm({
				...resetPwdForm,
				email: urlParams.get('email'),
				code: urlParams.get('code'),
			});
		}
	}, [booted]);

	return (
		<div className='page'>
			<div className='page__content'>
				<div className='sandbox__block'>
					<div className='sandbox__title'>
						Reset Password
					</div>

					<div className='sandbox__description'>
						Reset here
					</div>

					<Input
						value={resetPwdForm.password}
						placeholder='New Password'
						onChange={e => setResetPwdForm({ ...resetPwdForm, password: e.target.value }) }
					/>

					<Input
						value={resetPwdForm.confirmPassword}
						placeholder='Confirm Password'
						onChange={e => setResetPwdForm({ ...resetPwdForm, confirmPassword: e.target.value }) }
					/>

					<button
						className='sandbox__success'
						onClick={() => {
							resetPasswordAction(resetPwdForm);
						}}>

						Update
					</button>
				</div>
			</div>
		</div>
	);
};

const mstp = s => ({
	booted: s.app.booted,
});

const mdtp = {
	addToastAction: notificationActions.addToast,
	resetPasswordAction: authActions.resetPassword,
};

export default connect(mstp, mdtp)(ResetPassword);