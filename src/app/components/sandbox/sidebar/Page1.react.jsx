import { connect } from 'react-redux';
import { sidebarActions } from '../../../reducers/sidebar.reducer';

import SidebarHeader from '../../sidebar/SidebarHeader.react';
import Page2 from './Page2.react';

const Page1 = ({ addSidebarPageAction }) => {

	return (
		<div className='sidebar__page'>

			<SidebarHeader
				title='Simple Sidebar...!' />

			<div className='sidebar__body'>
				<div className='sidebar__body--title'>
					This is page 1
				</div>

				<div
					className='sidebar__body--link'
					onClick={() => { addSidebarPageAction({ page: <Page2 /> }); }}>

					Take me to <span>Page 2!</span>
				</div>

			</div>
		</div>
	)
}

const mdtp = {
	addSidebarPageAction: sidebarActions.addPage,
};

export default connect(null, mdtp)(Page1);