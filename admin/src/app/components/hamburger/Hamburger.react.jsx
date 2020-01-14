import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import mainNav from './HamburgerNav';

import { appActions } from '../../reducers/app.reducer';

import HamburgerItem from './HamburgerItem.react';

const Hamburger = ({
	toggleHamburgerMenu,
	toggleHamburgerMenuAction,
	location,
}) => {
	const [id] = useState(uuid());
	const [bp] = useState(1024);
	const [visible, setVisible] = useState(null);

	const { pathname } = location;

	// TODO :: better logic for this, use animate for overlay
	const open = () => {
		$(`#${id}`).addClass('hamburger__open');

		if ($(window).width() <= bp) {
			$(`#${id}overlay`).addClass('hamburger__overlay--visible');

			setTimeout(() => {
				$('.hamburger__overlay--visible').css({ opacity: 1 });
			}, 100);
		} else {
			$('.app').addClass('app__sidebar-open');
		}
	};

	const close = () => {
		$(`#${id}`).removeClass('hamburger__open');

		$('.hamburger__overlay--visible').css({ opacity: 0 });

		setTimeout(() => {
			$(`#${id}overlay`).removeClass('hamburger__overlay--visible');
		}, 600);

		$('.app').removeClass('app__sidebar-open');
	};

	useEffect(() => {
		const onResize = () => {
			if ($(window).width() > bp)
				setVisible(true);
			else
				setVisible(false);
		};

		$(window).on('resize', onResize);

		setTimeout(onResize, 1000);

		return () => $(window).off('resize', onResize);
	}, []);

	useEffect(() => {
		if (visible)
			open();
		else
			close();
	}, [visible]);

	useEffect(() => {
		if ($(window).width() > bp || visible === null)
			return;

		setVisible(!visible);
	}, [toggleHamburgerMenu]);

	return (
		<>
			<div className='hamburger' id={id}>
				<div className='hamburger__content'>
					{mainNav.map(x => {
						if (!x.published) return null;

						return <HamburgerItem {...x} pathname={pathname} key={x.title} />;
					})}
				</div>
			</div>
			<div
				className='hamburger__overlay'
				id={`${id}overlay`}
				onClick={() => {
					toggleHamburgerMenuAction(false);
				}}
			/>
		</>
	);
};

const mstp = s => ({
	toggleHamburgerMenu: s.app.toggleHamburgerMenu,
});

const mdtp = {
	toggleHamburgerMenuAction: appActions.toggleHamburgerMenu,
};

export default withRouter(connect(mstp, mdtp)(Hamburger));
