/*
HERO CAROUSEL like this, and then it
http://html.iwthemes.com/roker/run/index-one-page.html

Template
https://www.free-css.com/free-css-templates/page233/solution
*/

import { useEffect } from 'react';
// import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
// import { hot } from 'react-hot-loader/root';

// // https://webthemez.com/preview/?fortune-business-bootstrap-html-website-template

// import { history } from '../../store/store';

// import Header from '../header/Header.react';
import { usersActions } from '../../reducers/users.reducer';

// import Modal from '../modal/Modal.react';
// import Routes from './routing/Routes.react';
// import Notification from '../notification/Notification.react';
// import Sidebar from '../sidebar/Sidebar.react';
// import Hamburger from '../hamburger/Hamburger.react';
// import Preload from './Preload.react';
import Card from '../common/card/Card.react';
import CardHeader from '../common/card/CardHeader.react';
import CardBody from '../common/card/CardBody.react';

import Button from '../common/Button.react';

import Table from '../common/table/Table.react';

const Users = ({ booted, isLoggedIn, users, getAllProfilesAction, sendToastAction }) => {
	useEffect(() => {
		if (isLoggedIn)
			getAllProfilesAction();
	}, [booted, isLoggedIn]);

	users = Object.values(users).map(x => {
		const primaryEmail = x.email.filter(y => y.primary)[0];

		return {
			id: x.id,
			role: x.role,
			signupDate: x.signupDate,
			lastLogin: x.lastLogin,
			lastActive: x.lastActive,
			email: primaryEmail?.address,
			emailVerified: primaryEmail?.verificationCode === null,
		};
	});

	const usersTable = {
		data: users,
		columns: {
			id: 'ID',
			email: 'E-mail',
		},
		actions: {
			edit: {
				onEdit: () => { console.log('click'); },
				disabled: true,
			},
			select: {
				onSelect: () => { console.log('select'); },
				multiSelect: true,
			},
		},
	};

	console.log('users', users);

	return (
		<div className='page'>
			<div className='page__content'>
				<div className='page__content--block'>
					<Card>
						<CardHeader
							title='User Profiles' />

						<CardBody>
							<Table
								{...usersTable}
							/>

							<Button
								label='Send Msg to first user'
								onClick={() => {
									sendToastAction({ userID: users[0].id });
								}}
							/>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
};

const mstp = s => ({
	booted: s.app.booted,
	isLoggedIn: s.app.isLoggedIn,
	users: s.users,
});

const mdtp = {
	getAllProfilesAction: usersActions.getAllProfiles,
	sendToastAction: usersActions.sendToast,
};

export default connect(mstp, mdtp)(Users);
