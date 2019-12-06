import { useState, useEffect } from 'react';

import TableHeader from './TableHeader.react';
import TableRow from './TableRow.react';

const Table = ({ data, actions, columns }) => {
	const [rows, setRows] = useState([]);
	const [layout, setLayout] = useState([]);

	useEffect(() => {

		if (!Array.isArray(data))
			setRows(Object.values(data).map(x => x));
		else
			setRows(data);

		setLayout(
			Object.keys(columns).map(x => {
				let { title, onClick = null, type = null } = columns[x];

				return {
					key: x['key'] || x,
					title: title || columns[x],
					onClick,
					type,
				};
			})
		);
	}, [data]);

	// console.log('LAYOUT in TABLE', layout)
	// console.log('Columns in TABLE', columns)

	return (
		<div className='table'>
			<table>
				<TableHeader layout={layout} actions={actions} />

				<tbody>
					{ rows.map(x =>
						<TableRow
							actions={actions}
							data={x}
							layout={layout}
							key={x.id}
						/>
					)}
				</tbody>

			</table>
		</div>
	);
};

export default Table;
