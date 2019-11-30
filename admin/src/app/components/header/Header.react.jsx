import { connect } from 'react-redux';

import { appActions } from '../../reducers/app.reducer';

const Header = ({ toggleHamburgerMenuAction }) => {
	return (
		<header id='header' className='header'>
			<div>
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
};

export default connect(null, mdtp)(Header);
