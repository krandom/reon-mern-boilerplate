import { useState, useEffect } from 'react';

import useOnClickOutside from '../../../helpers/hooks/useOnClickOutside';
import Input from './Input.react';

// TODO :: consider changing names in options to something that won't be used in database
const Select = ({
	// id = uuid(),
	className = '',
	value = '',
	placeholder = null,
	disabled = false,
	options = [],


	onChange = null,
	// onFocus = null,
	// onBlur = null,
}) => {
	const [id] = useState(uuid());
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		if (open) {
			// TODO :: fix, need to pass id to <Input...
			$(`#${id}-dropdown`).focus();
		}
	}, [open]);

	const label = options.filter(x => x.value === value)[0];

	const handleOnClick = option => {
		console.log('handleOnClick', option)
		onChange(option);
		setOpen(false);
	};

	// const handleOnChange = e => {
	// 	if (onChange)
	// 		onChange(e);
	// };

	useOnClickOutside(id, () => setOpen(false));

	return (
		<div
			id={id}
			className={`select ${className}`}>

			<Input
				id={`${id}-input`}
				value={label?.label || ''}
				disabled={disabled}
				// onChange={handleOnChange}
				placeholder={placeholder}
				onFocus={() => {
					if (!disabled)
						setOpen(true);
				}}
				// onFocus={handleOnFocus}
				// onBlur={handleOnBlur}
			/>

			{ open &&
				<div className='select__dropdown'>
					<input
						id={`${id}-dropdown`}
						value={filter}
						placeholder='Search...'
						onChange={e => setFilter(e.target.value.toLowerCase())}
					/>

					<div className='select__dropdown--content'>

						{/* TODO :: option to filter out array of values to avoid duplicates... */}
						{ options
							.filter(x =>
								x.label?.toString().toLowerCase().includes(filter)
							)
							.map(x => {

								// TODO :: add visibility
								// TODO :: add disabled
								// TODO :: add description (subtitle, e.g. settings/meta data/add meta data...)
								// TODO :: add checkbox for multi select

								return (
									<div
										className='select__option'
										onClick={() => {
											if (!x.disabled)
												handleOnClick(x);
										}}
										key={`${id}${x.value}`}
									>

										{x.label}
									</div>
								);

							})
						}
					</div>
				</div>
			}
		</div>
	);
};

export default Select;