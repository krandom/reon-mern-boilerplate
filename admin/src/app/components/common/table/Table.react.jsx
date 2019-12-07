import { useState, useEffect } from 'react';

import TableHeader from './TableHeader.react';
import TableRow from './TableRow.react';

const Table = ({ data, actions, columns, sort }) => {
	// const [rows, setRows] = useState([]);
	// const [layout, setLayout] = useState([]);

	const [table, setTable] = useState({
		rows: [],
		layout: [],
		sort: null,
	});

	useEffect(() => {

		setTable({
			...table,
			// TODO :: do we even need this? or can we just set rows: data
			// TODO :: escape null values here to make sort work
			rows: !Array.isArray(data) ? Object.values(data).map(x => x) : data,
			layout: Object.keys(columns).map(x => {
				let { title, onClick = null, type = null, sort = true } = columns[x];

				return {
					key: x['key'] || x,
					title: title || columns[x],
					onClick,
					type,
					sort,
				};
			}),
			sort: !table.sort && Object.keys(columns).length > 0 ?
				{ by: Object.keys(columns)[0], asc: true } :
				null,
		});
	}, [data]);

	console.log('TABLE', table)

	// https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
	// NOTE :: make copy or affect the default object?
	let rows = [...table.rows];

	// TODO :: check for lowercase/uppercase etc...
	// TODO :: handle bool/int/flt/date
	if (table.sort) {
		rows = rows.sort((a, b) => a[table.sort.by].localeCompare(b[table.sort.by]));

		if (table.sort?.asc === false)
			rows.reverse();
	}

	return (
		<div className='table'>
			<table>
				<TableHeader
					table={table}
					actions={actions}
					onSort={key => {
						setTable({
							...table,
							sort: {
								by: key,
								asc: table.sort?.by === key ? !table.sort.asc : true,
							},
						});
					}} />

				<tbody>
					{ rows.map(x =>
						<TableRow
							actions={actions}
							row={x}
							table={table}
							key={x.id}
						/>
					)}
				</tbody>

			</table>
		</div>
	);
};

export default Table;
