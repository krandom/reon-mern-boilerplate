import { NavLink } from 'react-router-dom';

const HamburgerLink = ({ url, children, action, onClick, }) => {

	if (!url && !action)
		return (
			<div className='hamburger__link' onClick={onClick}>
				{children}
			</div>
		);

	return (
		<div className='hamburger__link' onClick={onClick}>
			{ url && url.includes('http') ?
				<a href={url} target='_blank'>
					{children}
				</a>
			:
				<NavLink to={url}>
					{children}
				</NavLink>
			}
		</div>
	)
};

export default HamburgerLink;