import { useState } from 'react';

import Checkbox from '../form/Checkbox.react';

const TableRow = ({ row, table, actions, onSelect }) => {
	const [id] = useState(uuid());

	const { layout, tr, rows } = table;

	console.log('row', row)
	// console.log('layout', layout)

	// console.log('trying', tr)

	return (
		<tr
			onClick={() => {
				if (tr.onClick)
					tr.onClick();
			}}
			className={`${row.isSelected && 'table__row--selected'}`}
		>
			{ actions &&
				<td style={{ padding: 0 }}> {/*  className={`${id}-actions`} */}

					{/* TODO :: loop actions but for now........ */}
					{ actions.select &&
						<div className={`table__action ${actions.select.disabled && 'disabled'}`}>
							<Checkbox
								checked={row.isSelected}
								className='table__checkbox'
								onChange={() => {
									const selectedRows = rows.filter(x => x.isSelected === true).map(x => x.id);

									if (actions.select?.multiSelect === true || selectedRows.length === 0 || selectedRows.includes(row.id))
										onSelect(row);


								}}
							/>
						</div>
					}
					{ actions.edit &&
						<div
							className={`table__action ${actions.edit.disabled && 'disabled'}`}
							onClick={e => {
								if (actions.edit.disabled)
									return;

								e.stopPropagation();
								actions.edit.onEdit(row);
							}}
						>
							<i className='fa fa-pencil' />
						</div>
					}
				</td>
			}
			{ layout.map(x => {

				const { key, onClick } = x;
				let { type } = x;
				let value = row[key];

				if (type) {
					if (type.label === 'boolean') {
						value = value ? type['true'] || 'On' : type['false'] || 'Off';
					}
				}

				return (
					<td
						onClick={() => {
							if (onClick)
								onClick(row);
						}}
						key={`${id}${key}`}>

						{value}
					</td>
				);
			})}
		</tr>
	);
};

export default TableRow;
