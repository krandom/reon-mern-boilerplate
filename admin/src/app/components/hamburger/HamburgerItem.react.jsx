import { useState, useEffect } from 'react';

import HamburgerLink from './HamburgerLink.react';

const HamburgerItem = ({ url, action, icon, title, subnav, pathname }) => {
	const [id] = useState(uuid());
	const [open, setOpen] = useState(false);


	useEffect(() => {
		if (open) {
			$(`#${id}`).css({
				height: 47 + $(`#${id} .hamburger__subnav`).height(),
				backgroundColor: '#2f4050',
			});
		} else {
			$(`#${id}`).css({
				height: 47,
				backgroundColor: 'transparent',
			});
		}
	}, [open]);

	return (
		<div className="hamburger__item" id={id} key={id}>
			<HamburgerLink
				url={url}
				action={action}
				active={open}
				onClick={() => {
					if (!subnav)
						return;

					setOpen(!open);
				}}
			>
				<div className="hamburger__link--icon">
					{icon && <i className={`fa fa-${icon}`} />}
				</div>

				<div className="hamburger__link--title">{title}</div>
			</HamburgerLink>

			{subnav &&
				<div className="hamburger__subnav">
					{subnav.map(y =>
						<HamburgerLink
							{...y}
							active={pathname === y.url}
							key={`${id}${y.title}`}>

							{y.title}
						</HamburgerLink>
					)}
				</div>
			}
		</div>
	);
};

export default HamburgerItem;
