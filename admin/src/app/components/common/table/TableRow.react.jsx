import { useState } from 'react';

const TableRow = ({ row, table, actions }) => {
	const [id] = useState(uuid());

	const { layout } = table;

	// console.log('row', row)
	// console.log('layout', layout)
	return (
		<tr>
			{ actions &&
				<td style={{ padding: 0 }}>
					{/* TODO :: loop actions but for now........ */}
					{ actions.edit && !actions.edit?.disabled &&
						<div
							className='table__action'
							onClick={e => {
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
