import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { appActions } from '../../reducers/app.reducer';

import HamburgerItem from './HamburgerItem.react';

const Hamburger = ({
	mainNav,
	showHamburgerMenu,
	toggleHamburgerMenuAction,
}) => {
  const [id] = useState(uuid());

	useEffect(() => {
		if (showHamburgerMenu) {
      $(`#${id}overlay`).addClass('hamburger__overlay--block');
      setTimeout(() => {
        $(`#${id}overlay`).css({ opacity: 1 });
      }, 10)

      $(`#${id}`).css({ left: 0 });
		} else {
      $(`#${id}overlay`).css({ opacity: 0 });
      setTimeout(() => {
        $(`#${id}overlay`).removeClass('hamburger__overlay--block');
      }, 300);

      $(`#${id}`).css({ left: -320 });
		}
	}, [showHamburgerMenu]);

	console.log('mainNav', mainNav);

  return (
  	<>
    <div className='hamburger' id={id}>

			<div className='hamburger__content'>
				{mainNav.map(x => {

					if (!x.published || !x.mobile)
						return;

					return <HamburgerItem {...x} />
				})}
			</div>
    </div>
    <div
    	className='hamburger__overlay'
    	id={`${id}overlay`}
    	onClick={() => { toggleHamburgerMenuAction(false); }}
    />
    </>
  );
}

const mstp = s => ({
	mainNav: s.app.mainNav,
	showHamburgerMenu: s.app.showHamburgerMenu,
});

const mdtp = {
	toggleHamburgerMenuAction: appActions.toggleHamburgerMenu,
};

export default connect(mstp, mdtp)(Hamburger);

/*

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

*/