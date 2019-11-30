import { useEffect } from 'react';

const Input = ({
	id = uuid(),
	className = '',
	value = '',
	placeholder = null,
	disabled = false,
	type = 'text',
	onChange = null,
	onFocus = null,
	onBlur = null,
}) => {
	const handleOnChange = e => {
		// if (value.length > 0) {
		// }

		if (onChange) onChange(e);
	};

	const handleOnFocus = e => {
		if (onFocus) onFocus(e);
	};

	const handleOnBlur = e => {
		// if (value.length === 0) {
		// }

		if (onBlur) onBlur(e);
	};

	useEffect(() => {
		if ($(`#${id}-input`).val().length > 0) handleOnFocus();
	}, []);

	return (
		<div id={id} className={`input-text ${className}`}>
			<input
				id={`${id}-input`}
				type={type}
				value={value}
				disabled={disabled}
				onChange={handleOnChange}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
			/>

			{placeholder && <label htmlFor={`${id}-input`}>{placeholder}</label>}
		</div>
	);
};

export default Input;
