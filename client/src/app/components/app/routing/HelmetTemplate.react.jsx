import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

const ReactHelmet = ({ location }) => {

	const { pathname } = location;

	const title = () => {
		if (pathname === '/')
			return 'This is the main page';

		return 'This is not';
	};

	return (
		<Helmet>
			<title>{title()}</title>
		</Helmet>
	);
};

export default withRouter(ReactHelmet);