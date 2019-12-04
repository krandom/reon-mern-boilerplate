import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';

import Card from '../../common/card/Card.react';
import CardHeader from '../../common/card/CardHeader.react';
import CardBody from '../../common/card/CardBody.react';

import Table from '../../common/table/Table.react';
import Button from '../../common/Button.react';

import ConstantsTemplateEdit from './ConstantsTemplateEdit.react';

const ConstantsTemplate = ({ title, slug, constants, disableSelectApp, disableAdd = false, addModalAction }) => {

	const tableData = {
		columns: {
			'Constant Name': 'name',
			'Key': 'key',
			'Value': 'value',
			'Description': 'description',
			'Application': 'app',
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
				{ !disableAdd &&
					<Button
						label='Add'
						onClick={() => {
							addModalAction({
								component:
									<ConstantsTemplateEdit
										slug={slug}
										title={title}
										add={true}
										constants={constants}
										disableSelectApp={disableSelectApp}
									/>,
							});
						}}
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