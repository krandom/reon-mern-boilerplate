import { useState, useEffect } from 'react';

import TableHeader from './TableHeader.react';
import TableRow from './TableRow.react';

const Table = ({ data, columns = null, }) => {
	const [rows, setRows] = useState([]);
	const [layout, setLayout] = useState([]);

	useEffect(() => {

		if (!Array.isArray(data))
			setRows(Object.values(data).map(x => x));
		else
			setRows(data);

		let tmpLayout = [];
		if (columns) {
			tmpLayout = Object.keys(columns).map(x => {
				// const c =
				return {
					key: x['key'] || columns[x],
					title: x['title'] || x
				};
			});

			setLayout(tmpLayout);
		}

	}, [data]);



	console.log('DATA in TABLE', rows)
	console.log('LAYOUT in TABLE', layout)
	return (
		<div className='table'>
			<table>
				<TableHeader layout={layout} />

				<tbody>
					{ rows.map(x =>
						<TableRow
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
