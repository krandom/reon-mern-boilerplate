const Button = ({
	type = 'primary',
	children = null,
	label = null,
	width = '',
	disabled = false,
	className = null,
	onClick,
	style = {},
}) => {

	return (
		<div
			className={`btn btn__${type} ${className} ${disabled && 'btn__disabled'}`}
			style={{ ...style, width }}
			disabled={disabled}
			onClick={() => {
				if (onClick)
					onClick();
			}}
		>
			{label || children}
		</div>
	);
};

export default Button;
