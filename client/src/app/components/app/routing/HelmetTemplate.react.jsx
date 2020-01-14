import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

/*
why you guys say google don't see helmet meta tags ,
I use https://search.google.com/search-console and see the helmet meta update the title

Use Google Search Console to see how Google crawls your site, and to initiate a crawl/index
of your pages: https://www.google.com/webmasters/tools/
*/

const ReactHelmet = ({ metaData, location }) => {

	const defaultData = {
		title: 'Reon MERN',
		tags: [],
	};
	const defaultRoute = '/';
	const { pathname } = location;

	let active = metaData[pathname] || null;

	if (!active) {
		if (defaultRoute && metaData[defaultRoute])
			active = metaData[defaultRoute];
		else
			active = defaultData;
	}

	if (metaData[defaultRoute])
		active.tags = { ...metaData[defaultRoute].tags, ...active.tags };

	const { tags } = active;

	return (
		<Helmet
			title={active.title || ''}
			meta={
				Object.keys(tags).map(x => ({
					property: x,
					content: tags[x].content,
				}))
			}
		/>

	);
};

const mstp = s => ({
	metaData: s.app.metaData,
});

export default withRouter(connect(mstp, null)(ReactHelmet));