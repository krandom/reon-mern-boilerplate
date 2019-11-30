const Button = ({
	type = 'primary',
	children = null,
	label = null,
	width = '',
	disabled = false,
	className = null,
	onClick,
}) => {

	return (
		<div
			className={`btn btn__${type} ${className}`}
			style={{ width }}
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
