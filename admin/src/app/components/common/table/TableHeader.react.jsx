import { useState } from 'react';

const TableHeader = ({ layout = [] }) => {
	const [id] = useState(uuid());

	return (
		<thead>
			<tr>
				{ layout.map(x =>
					<th key={`${id}${x.key}`}>
						{x.title}
					</th>
				)}
			</tr>
		</thead>
	);
};

export default TableHeader;
