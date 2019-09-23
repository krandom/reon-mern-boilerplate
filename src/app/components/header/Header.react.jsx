import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import MegaMenu from './MegaMenu.react';
import MainNavLink from './MainNavLink.react';

const Header = ({
	mainNav,
	isLoggedIn,
	showModal,
	setAuthWindowAction,
	logoutAction,
}) => {

  return (
    <header
      id='header'
      className='header'>

      <div className='header__content'>
      	<div
      		className='header__logo'
      		onClick={() => { history.push('/'); }}>

      		<img src='/assets/logo/logo.png' />
      	</div>

        <div className='main-nav'>
        	{ mainNav.map(x => {

        		if (!x.published)
        			return;

        		return (
        			<>
								<div className='main-nav__item'>
									<MainNavLink url={x.url} title={x.title} action={x.action} />

									{x.subnav && !x.megamenu &&
										<div className='main-nav__item--content'>
											{x.subnav.map(y =>
												<MainNavLink url={y.url} title={y.title} action={y.action} />
											)}
										</div>
									}

									{ x.megamenu &&
										(x.megamenu === 'libraries' &&
											<MegaMenu />
										)
									}

								</div>

							</>
						);
        	})}
	      </div>
      </div>
    </header>
  );
}

const mstp = s => ({
	mainNav: s.app.mainNav,
});

export default connect(mstp, null)(Header);

/*

										{ x.url ?
											<NavLink to={x.url}>

											</NavLink>
										:
											`${x.title}`
										}

*/