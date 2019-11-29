import { connect } from 'react-redux';

import { appActions } from '../../reducers/app.reducer';

import MegaMenu from './MegaMenu.react';
import MainNavLink from './MainNavLink.react';

const Header = ({ mainNav, toggleHamburgerMenuAction }) => {
	return (
		<header id="header" className="header">
			<div className="header__content">
				<div
					className="header__logo"
					onClick={() => {
						history.push('/');
					}}
				>
					<img src="/assets/logo/logo.png" />
				</div>

				<div className="main-nav">
					{mainNav.map(x => {
						if (!x.published) return null;

						return (
							<div className="main-nav__item" key={`${JSON.stringify(x)}`}>
								<MainNavLink url={x.url} title={x.title} action={x.action} />

								{x.subnav && !x.megamenu &&
									<div className="main-nav__item--content">
										{x.subnav.map(y =>
											<MainNavLink
												url={y.url}
												title={y.title}
												action={y.action}
												key={`header-subnav-${x.title}-${y.title}`}
											/>
										)}
									</div>
								}

								{x.megamenu && x.megamenu === 'libraries' && <MegaMenu />}
							</div>
						);
					})}
				</div>

				<div
					className="header__hamburger"
					onClick={() => {
						toggleHamburgerMenuAction(null);
					}}
				>
					<i className="fa fa-bars" />
				</div>
			</div>
		</header>
	);
};

const mstp = s => ({
	mainNav: s.app.mainNav,
});

const mdtp = {
	toggleHamburgerMenuAction: appActions.toggleHamburgerMenu,
};

export default connect(mstp, mdtp)(Header);
