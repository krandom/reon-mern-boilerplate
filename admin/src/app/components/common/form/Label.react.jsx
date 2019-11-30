const Label = ({
	className = null,
	label = null,
}) => {

	return (
		<div className={`label-text ${className}`}>
			{label}
		</div>
	);
};

export default Label;
