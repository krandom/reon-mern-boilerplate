import { useState } from 'react';

const TableRow = ({ data, actions, layout = [] }) => {
	const [id] = useState(uuid());

	return (
		<tr>
			{ layout.map(x => {

				const { key, onClick } = x;
				let { type } = x;
				let value = data[key];

				if (type) {
					if (type.label === 'boolean') {
						value = value ? type['true'] || 'On' : type['false'] || 'Off';
					}
				}

				return (
					<td
						onClick={() => {
							if (onClick)
								onClick(data);
						}}
						key={`${id}${key}`}>

						{value}
					</td>
				);
			})}
			{ actions &&
				<tr>
					{/* TODO :: loop actions but for now........ */}
					{ actions.edit && !actions.edit?.disabled &&
						<div>
							<i
								className='fa fa-pencil'
								onClick={e => {
									e.stopPropagation();
									actions.edit.onEdit(data);
								}} />
						</div>
					}
				</tr>
			}
		</tr>
	);
};

export default TableRow;
