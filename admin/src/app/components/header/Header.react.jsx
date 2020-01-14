import { connect } from 'react-redux';

import { appActions } from '../../reducers/app.reducer';
import { authActions } from '../../reducers/auth.reducer';

const Header = ({ toggleHamburgerMenuAction, logoutAction }) => {
	return (
		<header id='header' className='header'>
			<div onClick={() => { logoutAction(); }}>
				<div className='header__logo'>
					<img src='/assets/logo/logo.png' />
					REON
				</div>
			</div>

			<div>
				<div
					className='header__hamburger'
					onClick={() => {
						toggleHamburgerMenuAction();
					}}>

					<i className='fa fa-bars' />
				</div>
			</div>
		</header>
	);
};

const mdtp = {
	toggleHamburgerMenuAction: appActions.toggleHamburgerMenu,
	logoutAction: authActions.logout,
};

export default connect(null, mdtp)(Header);
