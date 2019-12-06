import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { settingsActions } from '../../reducers/settings.reducer';
import { modalActions } from '../../reducers/modal.reducer';

import MetaDataEdit from './meta-data/MetaDataEdit.react';

import Card from '../common/card/Card.react';
import CardHeader from '../common/card/CardHeader.react';
import CardBody from '../common/card/CardBody.react';

import SelectApplication from '../common/form/select/SelectApplication.react';
import Select from '../common/form/Select.react';
import Label from '../common/form/Label.react';
import Input from '../common/form/Input.react';
import Button from '../common/Button.react';

const MetaData = ({ metaData, applicationConstants, setMetaDataAction, getMetaDataAction, addModalAction }) => {
	const [selectedApp, setSelectedApp] = useState(null);
	const [newRouteName, setNewRouteName] = useState('/');
	const [selectedRoute, setSelectedRoute] = useState(null);

	useEffect(() => {
		getMetaDataAction();
	}, []);

	const formatRoute = route => {
		/*
			TODO :: format and make sure it always starts with an /
							not end with /
							no more than one / in a row
		*/
		route = route.trim().toLowerCase().replace(/[^a-z/]/g, '');
		setNewRouteName(route);
	};

	const isValid = () => {
		return (
			newRouteName.length > 0 &&
			newRouteName.charAt(0) === '/' &&
			metaData.filter(x =>
				x.clientApp === selectedApp && x.route === newRouteName
			).length === 0
		);
	};

	console.log('metaData', metaData);
	// console.log('isValid', isValid());
	// console.log('applicationConstants', applicationConstants);

	return (
		<div className='page'>
			<div className='page__content'>
				<div className='page__content--block'>
					<Card>
						<CardHeader
							title='Meta Data' />

						<CardBody>
							<Label
								label='Select Application' />
							<SelectApplication
								value={selectedApp}
								onChange={option => setSelectedApp(option.value)}
							/>
						</CardBody>
					</Card>

					{/* TODO :: split into components */}
					{ selectedApp &&
						<>
							<Card>
								<CardHeader
									title={`Create new route for Application :: ${applicationConstants[selectedApp]}`} />

								<CardBody>
									<Label
										label='New Route' />
									<Input
										value={newRouteName}
										onChange={e => formatRoute(e.target.value)}
									/>
									<Button
										label='Add'
										disabled={!isValid()}
										onClick={() => {
											setMetaDataAction({
												clientApp: selectedApp,
												route: newRouteName,
											});

											setNewRouteName('/');
										}}
									/>
								</CardBody>
							</Card>

							<Card>
								<CardHeader
									title={selectedRoute ? `Meta Data for Route :: ${selectedRoute.value}` : 'Select Route'} />

								<CardBody>
									<Label
										label='Select Route' />
									<Select
										value={selectedRoute?.value}
										options={
											metaData
												.filter(x => x.clientApp === selectedApp)
												.map(x => ({
													...x,
													value: x.route,
													label: x.route,
												}))



													// console.log('x 1', x)
													// x.value = x.route;
													// x.label = x.route;
													// console.log('x 2', x)

													// return x;
												// })
										}
										onChange={e => setSelectedRoute(e)}
									/>

									{ selectedRoute &&
										<Button
											label='Add'
											onClick={() => {
												addModalAction({
													component:
														<MetaDataEdit
															clientApp={selectedApp}
															route={selectedRoute}
														/>,
												});
											}}
										/>
									}
								</CardBody>
							</Card>
						</>
					}
				</div>
			</div>
		</div>
	);
};

const mstp = s => ({
	metaData: s.settings.metaData,
	applicationConstants: s.app.constants.applications,
});

const mdtp = {
	getMetaDataAction: settingsActions.getMetaData,
	setMetaDataAction: settingsActions.setMetaData,
	addModalAction: modalActions.add,
};

export default connect(mstp, mdtp)(MetaData);
