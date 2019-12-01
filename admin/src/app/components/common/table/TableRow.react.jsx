import { useState } from 'react';

const TableRow = ({ data, layout = [] }) => {
	const [id] = useState(uuid());

	return (
		<tr>
			{ layout.map(x =>
				<td key={`${id}${x.key}`}>
					{data[x.key]}
				</td>
			)}
		</tr>
	);
};

export default TableRow;
