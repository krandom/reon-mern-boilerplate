import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { modalActions } from '../../../reducers/modal.reducer';

import Card from '../../common/card/Card.react';
import CardHeader from '../../common/card/CardHeader.react';
import CardBody from '../../common/card/CardBody.react';

import MetaDataEdit from './MetaDataEdit.react';
import MetaDataAddRoute from './MetaDataAddRoute.react';

import Label from '../../common/form/Label.react';
import Table from '../../common/table/Table.react';
import Button from '../../common/Button.react';
import Select from '../../common/form/Select.react';

// import ConstantsMetaDataEdit from './ConstantsMetaDataEdit.react';

const MetaDataRoutesTable = ({ selectedApp, metaData, addModalAction }) => {
	const [selectedRoute, setSelectedRoute] = useState(null);

	// NOTE :: Not the best way of doing things but you need the loop somewhere
	useEffect(() => {
		if (selectedRoute)
			setSelectedRoute({
				...selectedRoute,
				...metaData.filter(x => x.id === selectedRoute.id)[0],
			});
	}, [metaData]);

	return (
		<Card>
			<CardHeader
				title={`Meta Data for :: ${selectedApp.sLabel}`} />
			<CardBody>

				<Label
					label='Select Route' />
				<Select
					value={selectedRoute?.sValue}
					options={
						metaData
							.filter(x => x.clientApp === selectedApp.sValue)
							.map(x => ({
								...x,
								sValue: x.route,
								sLabel: x.route,
							}))
					}
					onChange={e => setSelectedRoute(e)}
				/>
				<Button
					label='Add Route'
					style={{ width: '140px', marginBottom: '20px' }}
					onClick={() => {
						addModalAction({
							component:
								<MetaDataAddRoute
									selectedApp={selectedApp.sValue}
									metaData={metaData}
								/>,
						});
					}}
				/>
				{ selectedRoute &&
					<>
						<Button
							label='Edit Route'
							style={{ width: '140px', marginLeft: '20px' }}
							onClick={() => {
								addModalAction({
									component:
										<MetaDataAddRoute
											selectedApp={selectedApp.sValue}
											selectedRoute={selectedRoute}
											metaData={metaData}
										/>,
								});
							}}
						/>
						<Button
							label='Add Metadata'
							style={{ width: '140px', marginLeft: '20px' }}
							onClick={() => {
								addModalAction({
									component:
										<MetaDataEdit
											clientApp={selectedApp.sValue}
											route={selectedRoute.sValue}
										/>,
								});
							}}
						/>
					</>
				}
				{ selectedRoute &&
					<Table
						columns={{
							value: 'Tag',
							content: 'Value',
						}}
						data={selectedRoute.tags}
						// {...tableData}
						// actions={{
						// 	edit: { onEdit: constant => addModal({ constant }) },
						// }}
					/>
				}
			</CardBody>
		</Card>
	);
};

const mdtp = {
	addModalAction: modalActions.add,
};

export default connect(null, mdtp)(MetaDataRoutesTable);

/*



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

*/