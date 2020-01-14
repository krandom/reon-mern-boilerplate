import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';

import Card from '../../common/card/Card.react';
import CardHeader from '../../common/card/CardHeader.react';
import CardBody from '../../common/card/CardBody.react';

import Table from '../../common/table/Table.react';
import Button from '../../common/Button.react';

import ConstantsMetaDataEdit from './ConstantsMetaDataEdit.react';

const ConstantsTemplate = ({ title, constants, addModalAction }) => {

	const tableData = {
		columns: {
			'group': 'Group',
			'type': 'Type',
			'key': 'Key',
			'value': 'Value',
			'description': 'Description',
		},
		data: constants,
	};

	const addModal = ({ constant = null }) => {
		addModalAction({
			component:
				<ConstantsMetaDataEdit
					constant={constant}
					constants={constants}
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
						edit: { onEdit: constant => addModal({ constant }) },
					}}
				/>
				<Button
					label='Add'
					onClick={() => addModal()}
					width='120px'
					style={{ marginTop: 20 }}
				/>
			</CardBody>
		</Card>
	);
};

const mdtp = {
	addModalAction: modalActions.add,
};

export default connect(null, mdtp)(ConstantsTemplate);