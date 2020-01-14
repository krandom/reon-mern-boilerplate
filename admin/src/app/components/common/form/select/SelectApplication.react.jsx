import { connect } from 'react-redux';

import Select from '../Select.react';

const SelectApplication = ({
	applications,
	...rest
}) => {

	return (
		<Select
			options={Object.keys(applications).map(x => ({ sLabel: applications[x], sValue: x }))}
			{...rest}
		/>
	);
};

const mstp = s => ({
	applications: s.app.constants?.applications || {},
});

export default connect(mstp, null)(SelectApplication);
