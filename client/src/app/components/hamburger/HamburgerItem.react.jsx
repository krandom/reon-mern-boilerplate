import { useState, useEffect } from 'react';

import HamburgerLink from './HamburgerLink.react';

const HamburgerItem = ({ url, action, icon, title, subnav }) => {
	const [id] = useState(uuid());
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			$(`#${id}`).css({ height: 60 + $(`#${id} .hamburger__subnav`).height() });
		} else {
			$(`#${id}`).css({ height: 60 });
		}
	}, [open]);

	return (
		<div className="hamburger__item" id={id} key={id}>
			<HamburgerLink
				url={url}
				action={action}
				onClick={() => {
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
						<HamburgerLink {...y} key={`${id}${y.title}`}>
							{y.title}
						</HamburgerLink>
					)}
				</div>
			}
		</div>
	);
};

export default HamburgerItem;
