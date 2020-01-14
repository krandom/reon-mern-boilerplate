import { useState } from 'react';

const TableHeader = ({ table, actions, onSort }) => {
	const [id] = useState(uuid());

	const { layout, sort } = table;

	return (
		<thead>
			<tr>
				{/* TODO :: add property position to actions so you can choose left/right */}
				{ actions &&
					<th />
				}
				{ layout.map(x =>
					<th key={`${id}${x.key}`}>
						{x.title}

						{ x.sort &&
							<div className='table__sort' onClick={() => onSort(x.key)}>
								<i className={`fa fa-sort-up ${sort?.by === x.key && sort?.asc ? 'active' : ''}`} />
								<i className={`fa fa-sort-down ${sort?.by === x.key && !sort?.asc ? 'active' : ''}`} />
							</div>
						}
					</th>
				)}
			</tr>
		</thead>
	);
};

export default TableHeader;
