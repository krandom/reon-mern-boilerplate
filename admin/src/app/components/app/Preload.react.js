import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Login from '../auth/Login.react';

const Preload = ({ booted, isLoggedIn }) => {
	const [visible, setVisible] = useState(true);
	const [showLogin, setShowLogin] = useState(false);
	const [disableToggle, setDisableToggle] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setDisableToggle(false);
		}, 2500);
	}, []);

	const toggle = () => {
		if (disableToggle || !visible)
			return;

		if (isLoggedIn) {
			$('.preload').css({ opacity: 0 });
			setTimeout(() => { setVisible(false); }, 500);
		} else {
			setShowLogin(true);
		}
	};

	useEffect(() => {
		toggle();
	}, [booted, disableToggle, isLoggedIn]);

	useEffect(() => {
		$('.login').css({ opacity: 1 });
	}, [showLogin]);

	if (!visible) return null;

	return (
		<div className='preload'>

			<div className='preload__loader'>
				LOADING...
			</div>

			{ showLogin &&
				<Login />
			}

		</div>
	);
};

const mstp = s => ({
	booted: s.app.booted,
	isLoggedIn: s.app.isLoggedIn,
});

export default connect(mstp, null)(Preload);
