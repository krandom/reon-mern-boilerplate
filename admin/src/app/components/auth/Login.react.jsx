import { useState } from 'react';
import { connect } from 'react-redux';

import { authActions } from '../../reducers/auth.reducer';

import Input from '../common/form/Input.react';
import Label from '../common/form/Label.react';
import Checkbox from '../common/form/Checkbox.react';
import Button from '../common/Button.react';

const Login = ({ loginAction }) => {

	const [loginForm, setLoginForm] = useState({
		email: 'test2@test.com',
		password: 'test',
		rememberMe: true,
	});

	const { email, password, rememberMe } = loginForm;

	const isValid = () => {
		return (
			email.length > 0 &&
			password.length > 0
		);
	};

	return (
		<div className='login'>
			<h4>
				Login to Admin Panel
			</h4>
			<Label
				label='Email Address:'
			/>
			<Input
				value={email}
				placeholder='Email'
				onChange={e => setLoginForm({ ...loginForm, email: e.target.value }) }
			/>
			<Label
				label='Password:'
			/>
			<Input
				value={password}
				placeholder='Password'
				onChange={e => setLoginForm({ ...loginForm, password: e.target.value }) }
			/>
			<Checkbox
				label='Remember Me'
				checked={rememberMe}
				onChange={() => { setLoginForm({ ...loginForm, rememberMe: !rememberMe }); }}
			/>
			<Button
				onClick={() => { loginAction(loginForm); }}
				label='Login'
				width='100%'
				disabled={!isValid()}
			/>
		</div>
	);
};

const mdtp = {
	loginAction: authActions.login,
};

export default connect(null, mdtp)(Login);
