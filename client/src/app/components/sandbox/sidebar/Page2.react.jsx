import { sidebarActions } from '../../../reducers/sidebar.reducer';
import { connect } from 'react-redux';
import SidebarHeader from '../../sidebar/SidebarHeader.react';

const Page2 = ({ delSidebarPageAction }) => {

	return (
		<div className='sidebar__page'>

			<SidebarHeader
				title='Simple Sidebar...!' />

			<div className='sidebar__body'>
				<div className='sidebar__body--title'>
					This is page 2
				</div>

				<p>
					Exciting. Now you can either go back to Page 1 or close the sidebar.
				</p>

				<div
					className='sidebar__body--link'
					onClick={() => { delSidebarPageAction(); }}>

					Take me back to <span>Page 1!</span>
				</div>
			</div>
		</div>
	);
};

const mdtp = {
	delSidebarPageAction: sidebarActions.delPage,
};

export default connect(null, mdtp)(Page2);