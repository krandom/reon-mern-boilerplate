import { NavLink } from 'react-router-dom';

const HamburgerLink = ({ url, children, action, active, onClick }) => {
	const key = url;

	if (!url && !action)
		return (
			<div className={`hamburger__link ${active && 'hamburger__link--active'}`} onClick={onClick} key={key}>
				{children}
			</div>
		);

	return (
		<div className={`hamburger__link ${active && 'hamburger__link--active'}`} onClick={onClick} key={key}>
			{url && url.includes('http') ?
				<a href={url} target='_blank' rel='noopener noreferrer'>
					{children}
				</a>
				:
				<NavLink to={url}>{children}</NavLink>
			}
		</div>
	);
};

export default HamburgerLink;
