import { useState } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../../reducers/auth.reducer';

import Input from '../../common/form/Input.react';
import Checkbox from '../../common/form/Checkbox.react';
import SandboxProfile from './SandboxProfile';

const SandboxAuth = ({
	isLoggedIn,
	signupAction,
	loginAction,
	logoutAction,
	requestPwdResetLinkAction,
}) => {
	const [signupForm, setSignupForm] = useState({
		email: 'test@test.com',
		password: 'test',
	});

	const [loginForm, setLoginForm] = useState({
		email: 'test@test.com',
		password: 'test',
		rememberMe: true,
	});

	const [resetPwdForm, setResetPwdForm] = useState({
		email: 'test@test.com',
	});

	return (
		<div className='page'>
			<div className='page__content'>

				{ !isLoggedIn &&
					<div className='sandbox__block'>
						<div className='sandbox__title'>
							Sign up!
						</div>

						<div className='sandbox__description'>
							Sign up here
						</div>

						<Input
							value={signupForm.email}
							placeholder='E-mail'
							onChange={e => setSignupForm({ ...signupForm, email: e.target.value }) }
						/>

						<Input
							value={signupForm.password}
							type='text'
							placeholder='Password'
							onChange={e => setSignupForm({ ...signupForm, password: e.target.value }) }
						/>

						<button
							className='sandbox__success'
							onClick={() => {
								signupAction(signupForm);
							}}>

							Sign Up
						</button>
					</div>
				}

				{ !isLoggedIn &&
					<div className='sandbox__block'>
						<div className='sandbox__title'>
							Profile!
						</div>

						<div className='sandbox__description'>
							Log in here
						</div>

						<Input
							value={loginForm.email}
							placeholder='Email'
							onChange={e => setLoginForm({ ...loginForm, email: e.target.value }) }
						/>

						<Input
							value={loginForm.password}
							type='password'
							placeholder='Password'
							onChange={e => setLoginForm({ ...loginForm, password: e.target.value }) }
						/>

						<Checkbox
							checked={loginForm.rememberMe}
							onChange={() => setLoginForm({ ...loginForm, rememberMe: !loginForm.rememberMe }) }> Remember Me</Checkbox>

						<button
							className='sandbox__success'
							onClick={() => {
								loginAction(loginForm);
							}}>

							Login
						</button>
					</div>
				}

				{ !isLoggedIn &&
					<div className='sandbox__block'>
						<div className='sandbox__title'>
							Reset Password
						</div>

						<div className='sandbox__description'>
							Reset here
						</div>

						<Input
							value={resetPwdForm.email}
							placeholder='Email'
							onChange={e => setResetPwdForm({ email: e.target.value }) }
						/>

						<button
							className='sandbox__success'
							onClick={() => {
								requestPwdResetLinkAction(resetPwdForm);
							}}>

							Send Link
						</button>
					</div>
				}

				{ isLoggedIn &&
					<div className='sandbox__block'>
						<div className='sandbox__title'>
							Log out!
						</div>

						<div className='sandbox__description'>
							Log out here
						</div>

						<button
							className='sandbox__success'
							onClick={() => {
								logoutAction();
							}}>

							Do it!
						</button>
					</div>
				}

				{ isLoggedIn &&
					<SandboxProfile />
				}
			</div>
		</div>
	);
};

const mstp = s => ({
	isLoggedIn: s.app.isLoggedIn,
});

const mdtp = {
	signupAction: authActions.signup,
	loginAction: authActions.login,
	logoutAction: authActions.logout,
	requestPwdResetLinkAction: authActions.requestPwdResetLink,
};

export default connect(mstp, mdtp)(SandboxAuth);