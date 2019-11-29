import { connect } from 'react-redux';
import { sidebarActions } from '../../reducers/sidebar.reducer';

const SidebarHeader = ({ title, pages, delSidebarPageAction, closeSidebarAction }) => {

	return (
		<div className='sidebar-header'>
			{ pages.length > 1 &&
				<div
					className='sidebar-header__back'
					onClick={delSidebarPageAction}>

					<i className='fa fa-angle-left' />
				</div>
			}

			<div
				className='sidebar-header__close'
				onClick={closeSidebarAction}>

				<i className='fa fa-times' />
			</div>

			<div className='sidebar-header__title'>
				{title || ''}
			</div>
		</div>
	);
};

const mstp = s => ({
	pages: s.sidebar.pages,
});

const mdtp = {
	delSidebarPageAction: sidebarActions.delPage,
	closeSidebarAction: sidebarActions.close,
};

export default connect(mstp, mdtp)(SidebarHeader);