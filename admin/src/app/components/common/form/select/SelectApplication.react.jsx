import { connect } from 'react-redux';

import Select from '../Select.react';

const SelectApplication = ({
	applications,
	...rest
}) => {

	return (
		<Select
			options={Object.keys(applications).map(x => ({ label: applications[x], value: x }))}
			{...rest}
		/>
	);
};

const mstp = s => ({
	applications: s.app.constants?.applications || {},
});

export default connect(mstp, null)(SelectApplication);
