import { useEffect } from 'react';
import { connect } from 'react-redux';
import { usersActions } from '../../reducers/users.reducer';

import Card from '../common/card/Card.react';
import CardHeader from '../common/card/CardHeader.react';
import CardBody from '../common/card/CardBody.react';

const MetaData = ({ booted, isLoggedIn, users, getAllProfilesAction }) => {

	return (
		<div className='page'>
			<div className='page__content'>
				<div className='page__content--block'>
					<Card>
						<CardHeader
							title='Meta Data' />

						<CardBody>

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
};

export default connect(mstp, mdtp)(MetaData);
