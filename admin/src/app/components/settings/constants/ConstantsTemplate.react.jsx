import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';

import Card from '../../common/card/Card.react';
import CardHeader from '../../common/card/CardHeader.react';
import CardBody from '../../common/card/CardBody.react';

import Table from '../../common/table/Table.react';
import Button from '../../common/Button.react';

import ConstantsTemplateEdit from './ConstantsTemplateEdit.react';

const ConstantsTemplate = ({
	title,
	slug,
	constants,
	disableSelectApp,
	disableAdd = false,
	hideApp = false,
	addModalAction,
}) => {

	const tableData = {
		columns: {
			name: 'Constant Name',
			key: 'Key',
			value: 'Value',
			description: 'Description',
		},
		data: constants,
	};

	if (!hideApp)
		tableData.columns.app = 'Application';

	const addModal = ({ constant = null }) => {
		addModalAction({
			component:
				<ConstantsTemplateEdit
					slug={slug}
					title={title}
					constant={constant}
					constants={constants}
					disableSelectApp={disableSelectApp}
				/>,
		});
	};

	return (
		<Card>
			<CardHeader
				title={title} />

			<CardBody>
				<Table
					{...tableData}
					actions={{
						edit: {
							onEdit: constant => addModal({ constant }),
						},
					}}
				/>
				{ !disableAdd &&
					<Button
						label='Add'
						onClick={() => addModal({ slug, title, constants, disableSelectApp })}
						width='120px'
						style={{ marginTop: 20 }}
					/>
				}
			</CardBody>
		</Card>
	);
};

const mdtp = {
	addModalAction: modalActions.add,
};

export default connect(null, mdtp)(ConstantsTemplate);