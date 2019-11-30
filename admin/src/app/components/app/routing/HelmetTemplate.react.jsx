import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

const ReactHelmet = ({ location }) => {

	const { pathname } = location;

	return (
		<Helmet>
			<title>Reon MERN Admin Panel</title>
		</Helmet>
	);
};

export default withRouter(ReactHelmet);
