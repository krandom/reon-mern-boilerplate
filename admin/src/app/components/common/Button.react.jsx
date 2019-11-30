const Button = ({
	type = 'primary',
	children = null,
	label = null,
	width = '',
	disabled = false,
	className = null,
}) => {

	return (
		<button
			className={`btn btn__${type} ${className}`}
			style={{ width }}
			disabled={disabled}
		>
			{label || children}
		</button>
	);
};

export default Button;
