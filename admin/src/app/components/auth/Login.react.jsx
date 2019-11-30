import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { appActions } from '../../reducers/app.reducer';

import Input from '../common/form/Input.react';
import Label from '../common/form/Label.react';
import Checkbox from '../common/form/Checkbox.react';
import Button from '../common/Button.react';

const Login = () => {

	const [loginForm, setLoginForm] = useState({
		username: '',
		password: '',
		rememberMe: true,
	});

	const { username, password, rememberMe } = loginForm;

	const isValid = () => {
		return (
			username.length > 0 &&
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
				value={username}
				placeholder='Username'
				onChange={e => setLoginForm({ ...loginForm, username: e.target.value }) }
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
				onClick={() => {  }}
				label='Login'
				width='100%'
				disabled={!isValid()}
			/>
		</div>
	);
};

// const mdtp = {
// 	bootAction: appActions.boot,
// };

export default connect(null, null)(Login);
