import { useState } from 'react';
import { connect } from 'react-redux';
import { sandboxActions } from '../../../reducers/sandbox.reducer';

import Input from '../../common/form/Input.react';
import Checkbox from '../../common/form/Checkbox.react';

const SandboxAuth = ({
	isLoggedIn,
	signupAction,
	loginAction,
	logoutAction,
}) => {
	const [signupForm, setSignupForm] = useState({
		email: '',
		password: '',
	});

	const [loginForm, setLoginForm] = useState({
		email: 'test@test.com',
		password: 'test123',
		rememberMe: true,
	});

	console.log('isLoggedIn', isLoggedIn)

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
							onChange={e => setSignupForm({...signupForm, email: e.target.value}) }
						/>

						<Input
							value={signupForm.password}
							type='password'
							placeholder='Password'
							onChange={e => setSignupForm({...signupForm, password: e.target.value}) }
						/>

						<button
							className='sandbox__success'
							onClick={() => {
								signupAction(signupForm)
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
							onChange={e => setLoginForm({...loginForm, email: e.target.value}) }
						/>

						<Input
							value={loginForm.password}
							type='password'
							placeholder='Password'
							onChange={e => setLoginForm({...loginForm, password: e.target.value}) }
						/>

						<Checkbox
							checked={loginForm.rememberMe}
							onChange={e => setLoginForm({...loginForm, rememberMe: !loginForm.rememberMe}) }> Remember Me</Checkbox>

						<button
							className='sandbox__success'
							onClick={() => {
								loginAction(loginForm)
							}}>

							Login
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
								logoutAction()
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
})

const mdtp = {
	signupAction: sandboxActions.signup,
	loginAction: sandboxActions.login,
	logoutAction: sandboxActions.logout,
};

export default connect(mstp, mdtp)(SandboxAuth);