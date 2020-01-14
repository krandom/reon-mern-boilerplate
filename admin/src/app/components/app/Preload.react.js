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
		}, 500);
	}, []);

	const toggle = () => {
		if (disableToggle)
			return;

		if (isLoggedIn) {
			$('.preload').css({ opacity: 0 });
			setTimeout(() => { setVisible(false); }, 1000);
		} else {
			setVisible(true);
			setShowLogin(true);
		}
	};

	useEffect(toggle, [booted, disableToggle, isLoggedIn]);

	if (!visible) return null;

	// TODO :: make proper loader/spinner

	return (
		<div className='preload'>

			{ disableToggle &&
				<div className='preload__loader'>
					LOADING...
				</div>
			}

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
