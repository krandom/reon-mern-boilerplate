import { NavLink } from 'react-router-dom';

const MainNavLink = ({ url, title, action }) => {

	if (!url && !action)
		return (
			<div className='main-nav__link'>
				{title}
			</div>
		);

	return (
		<div className='main-nav__link'>
			{ url && url.includes('http') ?
				<a href={url} target='_blank' rel='noopener noreferrer'>
					{title}
				</a>
				:
				<NavLink to={url}>
					{title}
				</NavLink>
			}
		</div>
	);
};

export default MainNavLink;