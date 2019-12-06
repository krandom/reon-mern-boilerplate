import { useState } from 'react';

const TableHeader = ({ layout = [], actions }) => {
	const [id] = useState(uuid());
	return (
		<thead>
			<tr>
				{ layout.map(x =>
					<th key={`${id}${x.key}`}>
						{x.title}
					</th>
				)}
				{/* TODO :: add property position to actions so you can choose left/right */}
				{ actions &&
					<th />
				}
			</tr>
		</thead>
	);
};

export default TableHeader;
