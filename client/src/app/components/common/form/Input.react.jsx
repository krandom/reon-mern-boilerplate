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
		if (value.length > 0) {
			$(`#${id} label`).addClass('input-text__small');
			$(`#${id} div`).addClass('input-text__active-bar');
		}

		if (onChange) onChange(e);
	};

	const handleOnFocus = e => {
		$(`#${id} label`).addClass('input-text__small');
		$(`#${id} div`).addClass('input-text__active-bar');

		if (onFocus) onFocus(e);
	};

	const handleOnBlur = e => {
		if (value.length === 0) {
			$(`#${id} label`).removeClass('input-text__small');
			$(`#${id} div`).removeClass('input-text__active-bar');
		}

		if (onBlur) onBlur(e);
	};

	useEffect(() => {
		if ($(`#${id}-input`).val().length > 0)
			handleOnFocus();
	}, []);

	return (
		<div
			id={id}
			className={`input-text ${className}`}>

			<input
				id={`${id}-input`}
				type={type}
				value={value}
				disabled={disabled}
				onChange={handleOnChange}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
			/>

			{ placeholder &&
				<label htmlFor={`${id}-input`}>{placeholder}</label>
			}

			<div />
		</div>
	);
};

export default Input;