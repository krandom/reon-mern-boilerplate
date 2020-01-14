const CardBody = ({
	children,
	padding = true,
}) => {
	return (
		<div className={`card-body ${padding && 'card-body__padding'}`}>
			{children}
		</div>
	);
};

export default CardBody;
