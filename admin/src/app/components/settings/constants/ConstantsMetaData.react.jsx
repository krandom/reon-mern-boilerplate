import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';

import Card from '../../common/card/Card.react';
import CardHeader from '../../common/card/CardHeader.react';
import CardBody from '../../common/card/CardBody.react';

import Table from '../../common/table/Table.react';
import Button from '../../common/Button.react';

import ConstantsMetaDataEdit from './ConstantsMetaDataEdit.react';

const ConstantsTemplate = ({ title, slug, constants, addModalAction }) => {

	const tableData = {
		columns: {
			'Group': 'group',
			'Type': 'type',
			'Key': 'key',
			'Value': 'value',
			'Description': 'description',
		},
		data: constants,
	};

	return (
		<Card>
			<CardHeader
				title={title} />

			<CardBody>
				<Table
					{...tableData}
				/>
				<Button
					label='Add'
					onClick={() => {
						addModalAction({
							component:
								<ConstantsMetaDataEdit
									add={true}
									constants={constants}
								/>,
						});
					}}
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