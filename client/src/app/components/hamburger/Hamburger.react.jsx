import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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
			}, 10);

			$(`#${id}`).css({ left: 0 });
		} else {
			$(`#${id}overlay`).css({ opacity: 0 });
			setTimeout(() => {
				$(`#${id}overlay`).removeClass('hamburger__overlay--block');
			}, 300);

			$(`#${id}`).css({ left: -320 });
		}
	}, [showHamburgerMenu]);

	return (
		<>
			<div className='hamburger' id={id}>

				<div className='hamburger__content'>
					{mainNav.map(x => {

						if (!x.published || !x.mobile)
							return null;

						return <HamburgerItem {...x} key={x.title}/>;
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
};

const mstp = s => ({
	mainNav: s.app.mainNav,
	showHamburgerMenu: s.app.showHamburgerMenu,
});

const mdtp = {
	toggleHamburgerMenuAction: appActions.toggleHamburgerMenu,
};

export default connect(mstp, mdtp)(Hamburger);