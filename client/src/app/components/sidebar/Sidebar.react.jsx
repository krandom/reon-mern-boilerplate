import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sidebarActions } from '../../reducers/sidebar.reducer';

// TODO :: add transition
const Sidebar = ({ pages, delPageAction }) => {
	// transition,
	const [id] = useState(uuid());

	useEffect(() => {
		if (pages.length > 0) {
			$(`#${id}overlay`).addClass('sidebar__overlay--block');
			setTimeout(() => {
				$(`#${id}overlay`).css({ opacity: 1 });
			}, 10);

			$(`#${id}`).css({ right: 0 });
		} else if (pages.length === 0) {
			$(`#${id}overlay`).css({ opacity: 0 });
			setTimeout(() => {
				$(`#${id}overlay`).removeClass('sidebar__overlay--block');
			}, 300);

			$(`#${id}`).css({ right: -320 });
		}
	}, [pages]);

	return (
		<>
			<div className={`sidebar`} id={id}>
				{pages.length > 0 && pages[pages.length - 1]}
			</div>
			<div
				className="sidebar__overlay"
				id={`${id}overlay`}
				onClick={() => {
					delPageAction();
				}}
			/>
		</>
	);
};

const mstp = s => ({
	pages: s.sidebar.pages,
	transition: s.sidebar.transition,
});

const mdtp = {
	delPageAction: sidebarActions.delPage,
};

export default connect(mstp, mdtp)(Sidebar);
